import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllEventsGQL, EventCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  public events: EventCollection;
  public title: string = 'Event Collection';

  private subscription = new Subscription();

  constructor(
    private allEventsGQL: AllEventsGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.events = collection)
    );
  }

  public loadContent(): Observable<EventCollection> {
    return this.allEventsGQL.fetch().pipe(
      map((result) => result.data.eventCollection as EventCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
