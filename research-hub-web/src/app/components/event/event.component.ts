import { Component, OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, flatMap, map, first, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    EventCollection, 
    AllEventsGQL,  
    GetEventBySlugGQL,
    GetEventByIdGQL,
    Event 
} from '../../graphql/schema';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';


@Component({
  selector: 'app-Event',
  templateUrl: './Event.component.html',
  styleUrls: ['./Event.component.scss']
})
export class EventComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent
  };

  public allEvents$: Observable<EventCollection>;
  public event$: Observable<Event>;
  public slug: string;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public allEventsGQL: AllEventsGQL,
    public getEventBySlugGQL: GetEventBySlugGQL,
    public getEventByIDGQL: GetEventByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    private bodyMediaService: BodyMediaService
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getArticleBySlug() method.
     */
    this.route.params.pipe(first()).subscribe(params => {
      this.slug = params.slug || this.route.snapshot.data.slug;
      this._loadContent();
    });

  }

  /**
   * Function that loads the Event/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual event,
     * therefore run the corresponding query. If not, return all Event.
     */
    if (!!this.slug) {
      this.getEventBySlug(this.slug).pipe(first()).subscribe(data => {
        this.event$ = this.getEventByID(data.sys.id);
        this.event$.pipe(first()).subscribe(res => {
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
   * Function that returns all articles from the ArticleCollection as an observable
   * of type ArticleCollection. This is then unwrapped with the async pipe.
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
   * Function that returns an individual article from the ArticleCollection by it's slug
   * as an observable of type Article. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /articles.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getEventBySlug(slug: string): Observable<Event> {
    try {
      return this.getEventBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.eventCollection.items)) as Observable<Event>;
    } catch (e) { console.error(`Error loading Event ${slug}:`, e); }
  }

   /**
   * Function that returns an individual Event from the EventCollection by it's ID
   * as an observable of type Event. This is then unwrapped with the async pipe.
   * ID is retrieved by subscribing to 'getEventBySlug'.
   */
  public getEventByID(id: string): Observable<Event> {
    try {
      return this.getEventByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.event), catchError(err => (this.router.navigate(['/error/500'])))) as Observable<Event>;
    } catch (e) { console.error(`Error loading event ${id}:`, e); }
  }
}