
import {map, first} from 'rxjs/operators';
import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {CerApiService} from 'app/services/cer-api.service';
import {AuthService} from '../../services/auth.service';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {AppComponentService} from '../../app.component.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../shared/error-dialog/error-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AnalyticsService} from '../../services/analytics.service';
import * as format from 'date-fns/format';
import {CanComponentDeactivate} from '../../routing/routing.confirm-deactivate';

import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {ResearchHubApiService} from '../../services/research-hub-api.service';


@Component({
  selector: 'app-request-vm',
  templateUrl: './request-vm.component.html',
  styleUrls: ['./request-vm.component.scss']
})
export class RequestVmComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  private static requestVmFormKey = 'requestVmForm';

  @ViewChild('resultsDummyHeader') private resultsDummyHeader: ElementRef;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  public requestVmForm: FormGroup;
  public times = [];
  public dateToday = new Date();
  public dateCtrl = new FormControl(undefined, Validators.required);
  public timeCtrl = new FormControl(undefined, Validators.required);
  public submitting = false;
  public response: any;
  private routeParamsSub: Subscription;
  public title = 'Request a Research Virtual Machine Consultation';
  public image = 'content/research-vm.jpg';


  private static getTimes() {
    const times = [];

    for (let i = 9; i < 17; i++) {
      let time = '';

      if (i < 10) {
        time += '0';
      }

      time += i;

      times.push(time + ':00');
      times.push(time + ':30');
    }

    return times;
  }

  constructor(private formBuilder: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>,
              private cerApiService: CerApiService, public apiService: ResearchHubApiService,
              public authService: AuthService, private appComponentService: AppComponentService,
              public dialog: MatDialog, private location: Location, private route: ActivatedRoute,
              private analyticsService: AnalyticsService) {
    dateAdapter.setLocale('en-GB');
  }

  canDeactivate() {
    if (!this.requestVmForm.dirty || this.response !== undefined) {
      return true;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Leave form?',
        message: 'Leaving this form will delete all of the information you have filled in.'
      }
    });
    const afterClosedObs = dialogRef.afterClosed();
    const afterClosedSub = afterClosedObs.subscribe();

    return afterClosedObs.pipe(map(result => {
      afterClosedSub.unsubscribe();
      return result;
    }), first());
  }

  excludeWeekendsFilter(d: Date): boolean {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  ngOnInit() {
    this.analyticsService.trackIntegratedService(this.title, this.location.path());

    this.times = RequestVmComponent.getTimes();
    this.appComponentService.setTitle(this.title);

    this.requestVmForm = this.formBuilder.group({
      date: this.dateCtrl,
      time: this.timeCtrl,
      comments: ['']
    });

    this.routeParamsSub =
      this.route.queryParams
        .subscribe(params => {
          const retry = params['retry'];

          if (retry) {
            this.loadRequest();
          } else {
            this.clearRequest();
          }
        });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  saveRequest() {
    localStorage.setItem(RequestVmComponent.requestVmFormKey, JSON.stringify(this.requestVmForm.getRawValue()));
  }

  loadRequest() {
    const item = localStorage.getItem(RequestVmComponent.requestVmFormKey);

    if (item !== null) {
      const value = JSON.parse(item);
      console.log(RequestVmComponent.requestVmFormKey, value);
      this.requestVmForm.setValue(value);
    }
  }

  clearRequest() {
    localStorage.removeItem(RequestVmComponent.requestVmFormKey)
  }

  showErrorDialog(title: string, message: string, closeButtonName: string, timeout: number) {
    return this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        message: message,
        closeButtonName: closeButtonName,
        timeout: timeout
      }
    });
  }

  submit() {
    const isValid = this.requestVmForm.valid;
    this.dateCtrl.markAsTouched();
    this.timeCtrl.markAsDirty();
    this.timeCtrl.markAsTouched();

    if (isValid) {
      this.submitting = true;
      const values = this.requestVmForm.getRawValue();

      const body = {
        date: format(values.date, 'YYYY-MM-DD'),
        time: values.time,
        comments: values.comments
      };

      this.cerApiService.requestService('vm', body)
        .subscribe(
          (response) => {
            this.analyticsService.trackActionIntegrated(this.title);
            this.response = response;
            this.stepper.selectedIndex = 1; // Navigate to second step
            this.resultsDummyHeader.nativeElement.scrollIntoView();
            // TODO: set Done step to completed so that a tick appears next to 'Done', doesn't work at the moment
          },
          (err: HttpErrorResponse) => {
            this.submitting = false;
            console.log('Request VM Error: ', err);

            if (err.status === 401) {
              const dialogRef = this.showErrorDialog(
                'Session expired',
                'Redirecting to UoA Single Sign On...',
                'Login',
                5000
              );
              dialogRef.afterClosed().subscribe(result => {
                const url = this.location.path(false) + '?retry=true';
                this.saveRequest();
                this.authService.login(url);
              });
            } else {
              this.showErrorDialog(`${err.name}: ${err.status.toString()}`, JSON.stringify(err.error), 'Close', undefined);
            }
          });
    }
  }
}
