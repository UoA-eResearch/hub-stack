import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllSoftwareGQL, SoftwareCollection } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit, OnDestroy {
  public software: SoftwareCollection;

  private subscription = new Subscription();

  constructor(
    private allSoftwareGQL: AllSoftwareGQL
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.allSoftwareGQL.fetch().pipe(
      map((result) => result.data.softwareCollection as SoftwareCollection)
    ).subscribe((collection) => this.software = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
