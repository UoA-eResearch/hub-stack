import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  AllServicesGQL,
  AllServicesSlugsGQL,
  GetServiceBySlugGQL,
  Service,
  ServiceCollection
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { PageTitleService } from '@services/page-title.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public service;
  public service$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allServices$: Observable<ServiceCollection>;
  public parentSubHubs;
  public isMobile: Boolean;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allServicesGQL: AllServicesGQL,
    public allServicesSlugsGQL: AllServicesSlugsGQL,
    public getServiceBySlugGQL: GetServiceBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.detectDevice();
    this.detectWebP();
  }

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
     * passed to the getServiceBySlug() method.
     */
    this.route$ = this.route.params.subscribe(params => {
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
     * therefore run the corresponding query. If not, return all Services.
     */
    if (!!this.slug) {
      // Check if the article slug is valid otherwise redirect to 404
      this.getAllServicesSlugs().subscribe(data => {
        let slugs = [];
        data.items.forEach(data => {
          slugs.push(data.slug)
        })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404']) }
      });
      this.service = this.getServiceBySlug(this.slug);
      this.service$ = this.getServiceBySlug(this.slug).subscribe(data => {

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

        this.bodyMediaService.setBodyMedia(data.bodyText?.links);
        this.pageTitleService.title = data.title;
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'Services';
      this.allServices$ = this.getAllServices();
      try { this.service$.unsubscribe(); } catch { }
    }
  }

  /**
   * Function that returns all Services from the ServiceCollection as an observable
   * of type ServiceCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting Service/slug-name.
   */
  public getAllServices(): Observable<ServiceCollection> {
    try {
      return this.allServicesGQL.fetch()
        .pipe(pluck('data', 'serviceCollection')) as Observable<ServiceCollection>
    } catch (e) { console.error('Error loading all Services:', e) };
  }

  /**
   * Function that returns all services slugs from the ServiceCollection as an observable
   * of type ServiceCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllServicesSlugs(): Observable<ServiceCollection> {
    try {
      return this.allServicesSlugsGQL.fetch()
        .pipe(pluck('data', 'serviceCollection')) as Observable<ServiceCollection>
    } catch (e) { console.error('Error loading all services:', e) };
  }

  /**
   * Function that returns an individual Service from the ServiceCollection by it's slug
   * as an observable of type Service. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /Services.
   *
   * @param slug The Service's slug. Retrieved from the route parameter of the same name.
   */
  public getServiceBySlug(slug: string): Observable<Service> {
    try {
      return this.getServiceBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.serviceCollection.items)) as Observable<Service>;
    } catch (e) { console.error(`Error loading Service ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.service$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch { }
  }
}
