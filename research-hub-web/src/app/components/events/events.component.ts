import { Component, OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllEventsGQL,
  GetEventBySlugGQL,
  GetEventByIdGQL,
  EventCollection,
  Event,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public event$: Observable<Event>;
  public allEvents$: Observable<EventCollection>;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allEventsGQL: AllEventsGQL,
    public getEventBySlugGQL: GetEventBySlugGQL,
    public getEventByIDGQL: GetEventByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getEventBySlug() method.
     */
      this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the event/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual event,
     * therefore run the corresponding query. If not, return all events.
     */
    if (!!this.slug) {
      this.getEventBySlug(this.slug).subscribe(data => {
        this.event$ = this.getEventByID(data.sys.id);
        this.event$.subscribe(res => {
          this.bodyMediaService.setBodyMedia(res.bodyText.links);
        });
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Events');
      this.allEvents$ = this.getAllEvents();
    }
  }

  /**
   * Function that returns all events from the EventCollection as an observable
   * of type EventCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting event/slug-name.
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
   * the user is visiting /events.
   *
   * @param slug The event's slug. Retrieved from the route parameter of the same name.
   */
  public getEventBySlug(slug: string): Observable<Event> {
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
  public getEventByID(id: string): Observable<Event> {
    try {
      return this.getEventByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.event)) as Observable<Event>;
    } catch (e) { console.error(`Error loading event ${id}:`, e); }
  }
}