import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllEventsGQL, EventCollection } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  public events: EventCollection;

  private subscription = new Subscription();

  constructor(
    private allEventsGQL: AllEventsGQL
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.allEventsGQL.fetch().pipe(
      map((result) => result.data.eventCollection as EventCollection)
    ).subscribe((collection) => this.events = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
