import { Component, OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, flatMap, map, first, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    ServiceCollection, 
    AllServicesGQL,  
    GetServiceBySlugGQL,
    GetServiceByIdGQL,
    Service 
} from '../../graphql/schema';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent
  };

  public allServices$: Observable<ServiceCollection>;
  public service$: Observable<Service>;
  public slug: string;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public allServicesGQL: AllServicesGQL,
    public getServiceBySlugGQL: GetServiceBySlugGQL,
    public getServiceByIDGQL: GetServiceByIdGQL,
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
   * Function that loads the Service/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual Service,
     * therefore run the corresponding query. If not, return all Service.
     */
    if (!!this.slug) {
      this.getServiceBySlug(this.slug).pipe(first()).subscribe(data => {
        this.service$ = this.getServiceByID(data.sys.id);
        this.service$.pipe(first()).subscribe(res => {
          this.bodyMediaService.setBodyMedia(res.bodyText.links);
        });
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Services');
      this.allServices$ = this.getAllServices();
    }

  }

  /**
   * Function that returns all articles from the ArticleCollection as an observable
   * of type ArticleCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting article/slug-name.
   */
  public getAllServices(): Observable<ServiceCollection> {
    try {
      return this.allServicesGQL.fetch()
        .pipe(pluck('data', 'serviceCollection')) as Observable<ServiceCollection>
    } catch (e) { console.error('Error loading all services:', e) };
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
  public getServiceBySlug(slug: string): Observable<Service> {
    try {
      return this.getServiceBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.serviceCollection.items)) as Observable<Service>;
    } catch (e) { console.error(`Error loading service ${slug}:`, e); }
  }

   /**
   * Function that returns an individual Service from the serviceCollection by it's ID
   * as an observable of type Service. This is then unwrapped with the async pipe.
   * ID is retrieved by subscribing to 'getServiceBySlug'.
   */
  public getServiceByID(id: string): Observable<Service> {
    try {
      return this.getServiceByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.service), catchError(err => (this.router.navigate(['/error/500'])))) as Observable<Service>;
    } catch (e) { console.error(`Error loading service ${id}:`, e); }
  }
}