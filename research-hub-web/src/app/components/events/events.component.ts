import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllEventsGQL,
  AllEventsSlugsGQL,
  GetEventBySlugGQL,
  EventCollection,
  Event,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public event;
  public event$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allEvents$: Observable<EventCollection>;
  public parentSubHubs;
  public isMobile: Boolean;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allEventsGQL: AllEventsGQL,
    public allEventSlugsGQL: AllEventsSlugsGQL,
    public getEventBySlugGQL: GetEventBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.detectDevice();
    this.detectWebP();
   }

  // Detect if device is Mobile
  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getEventBySlug() method.
     */
      this.route$ = this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the Event/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual Event,
     * therefore run the corresponding query. If not, return all Events.
     */
    if (!!this.slug) {
      // Check if the article slug is valid otherwise redirect to 404
      this.getAllEventSlugs().subscribe(data => {
        let slugs = [];
          data.items.forEach(data => {
            slugs.push(data.slug)
          })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404'])}
      });
      this.event = this.getEventBySlug(this.slug);
      this.getEventBySlug(this.slug).subscribe(data => {

        // If Call To Action is an email address
        if (data.callToAction.match( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          data['callToAction'] = 'mailto:' + data['callToAction'];
        }

        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        }

        this.bodyMediaService.setBodyMedia(data.bodyText?.links);
        this.pageTitleService.title = data.title;
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'Events';
      this.allEvents$ = this.getAllEvents();
      try { this.event$.unsubscribe(); } catch {}
    }
  }

  /**
   * Function that returns all Events from the EventCollection as an observable
   * of type EventCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting Event/slug-name.
   */
  public getAllEvents(): Observable<EventCollection> {
    try {
      return this.allEventsGQL.fetch()
        .pipe(pluck('data', 'eventCollection')) as Observable<EventCollection>
    } catch (e) { console.error('Error loading all Events:', e) };
  }

  /**
   * Function that returns all event slugs from the EventCollection as an observable
   * of type EventCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllEventSlugs(): Observable<EventCollection> {
    try {
      return this.allEventSlugsGQL.fetch()
        .pipe(pluck('data', 'eventCollection')) as Observable<EventCollection>
    } catch (e) { console.error('Error loading all events:', e) };
  }

  /**
   * Function that returns an individual Event from the EventCollection by it's slug
   * as an observable of type Event. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /Events.
   *
   * @param slug The Event's slug. Retrieved from the route parameter of the same name.
   */
  public getEventBySlug(slug: string): Observable<Event> {
    try {
      return this.getEventBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.eventCollection.items)) as Observable<Event>;
    } catch (e) { console.error(`Error loading Event ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.event$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch {}
  }
}
