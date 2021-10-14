import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllServicesGQL, ServiceCollection } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnDestroy {
  public services: ServiceCollection;

  private subscription = new Subscription();

  constructor(
    private allServicesGQL: AllServicesGQL
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.allServicesGQL.fetch().pipe(
      map((result) => result.data.serviceCollection as ServiceCollection)
    ).subscribe((collection) => this.services = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
