import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, map, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllSubHubGQL,
  GetSubHubBySlugGQL,
  SubHubCollection,
  SubHub,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss']
})
export class SubhubsComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public subHub: Observable<SubHub>;
  public subHub$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allSubHubs$: Observable<SubHubCollection>;
  public parentSubHubs;
  public isMobile: Boolean;

  constructor(
    public route: ActivatedRoute,
    public allSubHubGQL: AllSubHubGQL,
    public getSubHubBySlugGQL: GetSubHubBySlugGQL,
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
     * passed to the getSubHubBySlug() method.
     */
      this.route$ = this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the SubHub/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual SubHub,
     * therefore run the corresponding query. If not, return all SubHub.
     */
    if (!!this.slug) {
      this.subHub = this.getSubHubBySlug(this.slug);
      this.subHub$ = this.subHub.subscribe(data => {
          this.bodyMediaService.setBodyMedia(data.bodyText.links);
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('SubHub');
      this.allSubHubs$ = this.getAllSubHubs();
      try { this.subHub$.unsubscribe(); } catch {}
    }
  }

  /**
   * Function that returns all SubHub from the SubHubCollection as an observable
   * of type SubHubCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting SubHub/slug-name.
   */
  public getAllSubHubs(): Observable<SubHubCollection> {
    try {
      return this.allSubHubGQL.fetch()
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>
    } catch (e) { console.error('Error loading all SubHub:', e) };
  }

  /**
   * Function that returns an individual SubHub from the SubHubCollection by it's slug
   * as an observable of type SubHub. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /SubHub.
   *
   * @param slug The SubHub's slug. Retrieved from the route parameter of the same name.
   */
  public getSubHubBySlug(slug: string): Observable<SubHub> {
    try {
      return this.getSubHubBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.subHubCollection.items)) as Observable<SubHub>;
    } catch (e) { console.error(`Error loading SubHub ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.subHub$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch {}
  }
}