import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllServicesGQL,
  AllServicesSlugsGQL,
  GetServiceBySlugGQL,
  ServiceCollection,
  Service,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public service: Observable<Service>;
  public service$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allServices$: Observable<ServiceCollection>;
  public parentSubHubs;
  public isMobile: Boolean;

  constructor(
    public route: ActivatedRoute,
    public allServicesGQL: AllServicesGQL,
    public allServicesSlugsGQL: AllServicesSlugsGQL,
    public getServiceBySlugGQL: GetServiceBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService
  ) { this.detectDevice(); }

  // Detect if device is Mobile
  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
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
      this.getAllServicesSlugs().subscribe(data => {
        let slugs = [];
          data.items.forEach(data => {
            slugs.push(data.slug)
          })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404'])}
      });
      this.service = this.getServiceBySlug(this.slug);
        this.service$ = this.service.subscribe(data => {

          // If Call To Action is an email address
          if (data.callToAction.match( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            data['callToAction'] = 'mailto:' + data['callToAction'];
          }
          
          this.bodyMediaService.setBodyMedia(data.bodyText.links);
          this.appComponentService.setTitle(data.title);
        });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Services');
      this.allServices$ = this.getAllServices();
      try { this.service$.unsubscribe(); } catch {}
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
   * Function that returns all Equipments slugs from the ServiceCollection as an observable
   * of type ServiceCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllServicesSlugs(): Observable<ServiceCollection> {
    try {
      return this.allServicesSlugsGQL.fetch()
        .pipe(pluck('data', 'serviceCollection')) as Observable<ServiceCollection>
    } catch (e) { console.error('Error loading all Equipments:', e) };
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
    } catch {}
  }
}