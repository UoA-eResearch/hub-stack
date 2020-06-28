
import {map, first} from 'rxjs/operators';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import * as subYears from 'date-fns/sub_years';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {CanComponentDeactivate} from '../../routing/routing.confirm-deactivate';
import {ResearchHubApiService} from '../../services/research-hub-api.service';


interface Person {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  access: string;
  roles: string[];
}


@Component({
  selector: 'app-request-data',
  templateUrl: './request-storage.component.html',
  styleUrls: ['./request-storage.component.scss']
})
export class RequestStorageComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  private requestFormKey = 'requestStorageForm';

  @ViewChild('resultsDummyHeader') private resultsDummyHeader: ElementRef;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  public dateToday = new Date();
  public submitting = false;
  private routeParamsSub: Subscription;
  private stepperSub: Subscription;
  private dataRequirementsSub: Subscription;
  private endDateSub: Subscription;
  public title = 'Request Research Storage';
  public image = 'content/vault.jpg';
  public response: any;
  public requestTypeForm: FormGroup;
  public projectForm: FormGroup;
  public dataInfoForm: FormGroup;
  public dataSizeForm: FormGroup;
  public requestDetailsForm: FormGroup;
  public isEditable = true;
  public showOtherField = false;
  public projectMembers: FormArray;
  public requestTypeClicked = false;
  public showSizeNextYear = true;

  public updateOptionsList = [
    'Extend Storage',
    'Change Access',
    'Other'
  ];

  public storageOptionsList = [
    'Dropbox',
    'Network Research Storage',
    'Something else'
  ];

  public fieldOfResearchCodes = [
    '01 Mathematical Sciences',
    '02 Physical Sciences',
    '03 Chemical Sciences',
    '04 Earth Sciences',
    '05 Environmental Sciences',
    '06 Biological Sciences',
    '07 Agricultural and Veterinary Sciences',
    '08 Information and Computing Sciences',
    '09 Engineering',
    '10 Technology',
    '11 Medical and Health Sciences',
    '12 Built Environment and Design',
    '13 Education',
    '14 Economics',
    '15 Commerce, Management, Tourism and Services',
    '16 Studies in Human Society',
    '17 Psychology and Cognitive Sciences',
    '18 Law and Legal Studies',
    '19 Studies in Creative Arts and Writing',
    '20 Language, Communication and Culture',
    '21 History and Archaeology',
    '22 Philosophy and Religious Studies',
    'Other'
  ];

  public dataRequirements = [
    'Part of a funded project research',
    'Requires human ethics research',
    'Requires animal ethics',
    'Part of clinical research',
    'Research involving children',
    'Commercially sensitive',
    'Research involves patent application',
    'Need for external collaborator access',
    'Requirement to delete data at end of project',
    'Other'
  ];

  public units = [
    'Gigabytes',
    'Terabytes'
  ];

  public access = [
    'Full Access',
    'Read Only'
  ];

  public roleTypes = [
    'Data Owner',
    'Data Contact',
    'Project Member'
  ];

  constructor(private formBuilder: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>,
              private cerApiService: CerApiService, public apiService: ResearchHubApiService,
              public authService: AuthService, private appComponentService: AppComponentService,
              public dialog: MatDialog, private location: Location, private route: ActivatedRoute,
              private analyticsService: AnalyticsService, private el: ElementRef) {
    dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.analyticsService.trackIntegratedService(this.title, this.location.path());

    this.requestTypeForm = this.formBuilder.group({
      requestType: new FormControl('New', Validators.required)
    });

    this.projectForm = this.formBuilder.group({
      title: new FormControl(undefined, Validators.required),
      abstract: new FormControl(undefined, [Validators.required, Validators.minLength(500)]),
      storageOptions: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, [Validators.required]),
      fieldOfResearch: new FormControl(undefined, Validators.required),
    });

    this.requestDetailsForm = this.formBuilder.group({
      existingFolderName: new FormControl(undefined, [Validators.required]),
      updateType: new FormControl(undefined, [Validators.required]),
      requestDetails: new FormControl(undefined, [Validators.required]),
      comments: new FormControl(undefined)
    });

    this.projectMembers = this.formBuilder.array([], Validators.compose([Validators.required]));

    this.dataInfoForm = this.formBuilder.group({
      dataRequirements: new FormControl(undefined),
      dataRequirementsOther: new FormControl(undefined),
      shortName: new FormControl(undefined, [Validators.required]),
      projectMembers: this.projectMembers
    });

    this.dataRequirementsSub = this.dataInfoForm.get('dataRequirements').valueChanges.subscribe(
      (items: string[]) => {
        const dataRequirementsOther = this.dataInfoForm.get('dataRequirementsOther');
        this.showOtherField = items && items.find((item) => item === 'Other') !== undefined;

        if (this.showOtherField) {
          dataRequirementsOther.setValidators([Validators.required]);
        } else {
          dataRequirementsOther.setValidators([]);
          dataRequirementsOther.setValue(undefined);
        }
      }
    );

    this.dataSizeForm = this.formBuilder.group({
      sizeThisYear: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      unitThisYear: new FormControl(this.units[0], Validators.required),
      sizeNextYear: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      unitNextYear: new FormControl(this.units[0], Validators.required),
      comments: new FormControl(undefined)
    });

    this.endDateSub = this.projectForm.get('endDate').valueChanges.subscribe(
      (date: Date) => {
        this.showSizeNextYear = new Date() <= subYears(date, 1);

        const sizeNextYear = this.dataSizeForm.get('sizeNextYear');
        const unitNextYear = this.dataSizeForm.get('unitNextYear');

        if (this.showSizeNextYear) {
          sizeNextYear.setValidators([Validators.required, Validators.min(1)]);
          unitNextYear.setValidators([Validators.required]);
        } else {
          sizeNextYear.setValidators(null);
          unitNextYear.setValidators(null);

          sizeNextYear.setValue(undefined);
          unitNextYear.setValue(undefined);
        }
      }
    );

    // Pre-populate first person in list with logged in user
    const user = this.authService.user;
    this.addPerson({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.mail,
      username: user.uid,
      access: 'Full Access',
      roles: []
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

    this.stepperSub = this.stepper.selectionChange.subscribe(selection => {
      this.isEditable = selection.selectedIndex !== this.stepper._steps.length - 1;
      this.resultsDummyHeader.nativeElement.scrollIntoView();
    });
  }

  canDeactivate() {
    if ((!this.requestTypeForm.dirty && !this.projectForm.dirty && !this.dataInfoForm.dirty && !this.dataSizeForm.dirty) || this.response !== undefined) {
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

  saveRequest() {
    const form = {
      requestTypeForm: this.requestTypeForm.getRawValue(),
      requestDetailsForm: this.requestDetailsForm.getRawValue(),
      projectForm: this.projectForm.getRawValue(),
      dataInfoForm: this.dataInfoForm.getRawValue(),
      dataSizeForm: this.dataSizeForm.getRawValue()
    };

    localStorage.setItem(this.requestFormKey, JSON.stringify(form));
  }

  loadRequest() {
    let form = localStorage.getItem(this.requestFormKey);

    if (form !== null) {
      form = JSON.parse(form);

      this.requestTypeForm.setValue(form['requestTypeForm']);
      this.requestDetailsForm.setValue(form['requestDetailsForm']);
      this.projectForm.setValue(form['projectForm']);
      this.dataInfoForm.setValue(form['dataInfoForm']);
      this.dataSizeForm.setValue(form['dataSizeForm']);

      this.stepper.selectedIndex = this.stepper._steps.length - 1; // Navigate to last step
    }
  }

  clearRequest() {
    localStorage.removeItem(this.requestFormKey)
  }

  addNewPerson() {
    this.addPerson({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      username: undefined,
      access: undefined,
      roles: []
    });
  }

  addPerson(person: Person) {
    const control = <FormArray>this.dataInfoForm.get('projectMembers');
    control.push(
      this.formBuilder.group({
        firstName: new FormControl(person.firstName, Validators.required),
        lastName: new FormControl(person.lastName, Validators.required),
        email: new FormControl(person.email, Validators.required),
        username: new FormControl(person.username),
        access: new FormControl(person.access, Validators.required),
        roles: new FormControl(person.roles, Validators.required)
      })
    );
  }

  deletePerson(index: number) {
    const control = <FormArray>this.dataInfoForm.get('projectMembers');
    control.removeAt(index);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
    this.stepperSub.unsubscribe();
    this.dataRequirementsSub.unsubscribe();
    this.endDateSub.unsubscribe();
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

  submit(requestType: string, currentForm: FormGroup) {

    const isValid = currentForm.valid; // Check if the form containing the submit button is valid
    currentForm.markAsTouched(); // Programmatically fire the formGroup's validators
    currentForm.markAsDirty();
    currentForm.markAsTouched();

    if (isValid) {
      this.submitting = true;
      let body;

      if (requestType === 'New') {
        body =  Object.assign({},
                this.requestTypeForm.getRawValue(),
                this.projectForm.getRawValue(),
                this.dataInfoForm.getRawValue(),
                this.dataSizeForm.getRawValue());

        // Convert endDate into string
        body.endDate = format(body.endDate, 'YYYY-MM-DD');
      } else if (requestType === 'Existing') {
        body =  Object.assign({},
                this.requestTypeForm.getRawValue(),
                this.requestDetailsForm.getRawValue());
      }

      console.log('Submitting request body: ', body);

      this.cerApiService.requestService('storage', body).subscribe(
        (response) => {
          this.analyticsService.trackActionIntegrated(this.title);
          this.response = response;
          this.stepper.selectedIndex = this.stepper._steps.length - 1; // Navigate to the 'Done' form
        },
        (err: HttpErrorResponse) => {
          this.submitting = false;

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
        }
      );

    }
  }
}
