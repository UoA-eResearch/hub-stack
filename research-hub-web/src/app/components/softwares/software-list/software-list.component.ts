import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllSoftwareGQL, SoftwareCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit, OnDestroy {
  public software: SoftwareCollection;
  public title: string = 'Software Collection';

  private subscription = new Subscription();

  constructor(
    private allSoftwareGQL: AllSoftwareGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(this.allSoftwareGQL.fetch().pipe(
      map((result) => result.data.softwareCollection as SoftwareCollection)
    ).subscribe((collection) => this.software = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
