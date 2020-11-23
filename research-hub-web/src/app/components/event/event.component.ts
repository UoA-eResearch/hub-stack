import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, filter, first, flatMap, reduce } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import {
  AllEventsGQL,
  GetEventBySlugGQL,
  GetEventByIdGQL,
  EventCollection,
  Event,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public allEvents$: Observable<EventCollection>;
  public event$: Observable<Event>;
  public slug: string;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allEventsGQL: AllEventsGQL,
    public getEventBySlugGQL: GetEventBySlugGQL,
    public getEventByIDGQL: GetEventByIdGQL,
    public cerGraphQLService: CerGraphqlService
  ) { }

  async ngOnInit() {
   /**
    * Check if there is a slug URL parameter present. If so, this is
    * passed to the getEventBySlug() method.
    */
   this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;


   /**
    * If this.slug is defined, we're loading an individual event,
    * therefore run the corresponding query. If not, return all events.
    */
   if (!!this.slug) {
     this.getEventBySlug(this.slug).subscribe(data => {
       this.event$ = this.getEventByID(data.sys.id);
     });
     this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
   } else {
     this.allEvents$ = this.getAllEvents();
   }
 }

 /**
  * Function that returns all events from the EventCollection as an observable
  * of type EventCollection. This is then unwrapped with the async pipe.
  *
  * This function is only called if no slug parameter is present in the URL, i.e. the
  * user is visiting article/slug-name.
  */
 public getAllEvents(): Observable<EventCollection> {
   try {
     return this.allEventsGQL.fetch()
       .pipe(pluck('data', 'eventCollection')) as Observable<EventCollection>
   } catch (e) { console.error('Error loading all events:', e) };
 }

 /**
  * Function that returns an individual event from the EventCollection by it's slug
  * as an observable of type Event. This is then unwrapped with the async pipe.
  *
  * This function is only called if no slug parameter is present in the URL, i.e.
  * the user is visiting /event.
  *
  * @param slug The event's slug. Retrieved from the route parameter of the same name.
  */
 public getEventBySlug(slug: string): Observable<Event>{
   try {
     return this.getEventBySlugGQL.fetch({ slug: this.slug })
       .pipe(flatMap(x => x.data.eventCollection.items)) as Observable<Event>;
   } catch (e) { console.error(`Error loading event ${slug}:`, e); }
 }

 /**
  * Function that returns an individual event from the EventCollection by it's ID
  * as an observable of type Event. This is then unwrapped with the async pipe.
  * ID is retrieved by subscribing to 'getEventBySlug'.
  */
 public getEventByID(id: string): Observable<Event>{
   try {
     return this.getEventByIDGQL.fetch({id: id})
       .pipe(map(x => x.data.event)) as unknown as Observable<Event>;
   } catch (e) { console.error(`Error loading event ${id}:`, e); }
 }
}

