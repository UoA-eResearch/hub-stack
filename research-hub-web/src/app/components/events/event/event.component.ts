import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event, GetEventBySlugGQL } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { GraphQLError } from 'graphql';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public event: Event;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public getEventBySlugGQL: GetEventBySlugGQL,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
  ) {
    this.detectWebP();

    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  ngOnInit() {
    this.subscriptions.add(this.route.params.pipe(
      map((params) => {
        return (params.slug || this.route.snapshot.data.slug) as string;
      }),
      switchMap((slug) => this.loadEvent(slug))
    ).subscribe({
      next: (event: Event) => this.event = event,
      error: (error) => {
        if (error! instanceof GraphQLError) {
          console.error(error);
          this.router.navigate(['error', 404]);
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadEvent(slug: string): Observable<Event> {
    return this.getEventBySlug(slug).pipe(
      map((data) => {
        // If Call To Action is an email address
        if (data.callToAction.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
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
        } else {
          this.bannerImageUrl = undefined;
        }

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title;

        return data;
      }));
  }

  /**
   * Function that returns an individual event from the EventCollection by it's slug
   * as an observable of type Event.
   *
   * @param slug The event's slug. Retrieved from the route parameter of the same name.
   */
  public getEventBySlug(slug: string): Observable<Event> {
    if (!slug) {
      this.router.navigate(['event', 'list'])
    }
    return this.getEventBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x.data.eventCollection.items.length === 0) {
          throw new Error(`Could not load event with slug "${slug}"`)
        } else {
          return x.data.eventCollection.items[0] as Event
        }
      })
    );
  }
}
