import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BlocksQuoteComponent } from '@components/shared/body-media/blocks-quote/blocks-quote.component';
import { BlocksEmbeddedAssetComponent } from '@components/shared/body-media/blocks-embedded-asset/blocks-embedded-asset.component';
import { BlocksEmbeddedEntryComponent } from '@components/shared/body-media/blocks-embedded-entry/blocks-embedded-entry.component';
import { InlinesEmbeddedEntryComponent } from '@components/shared/body-media/inlines-embedded-entry/inlines-embedded-entry.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  AllSubHubGQL,
  GetSubHubBySlugGQL,
  SubHub,
  SubHubCollection
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
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss']
})
export class SubhubsComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BlocksQuoteComponent,
    [BLOCKS.EMBEDDED_ASSET]: BlocksEmbeddedAssetComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BlocksEmbeddedEntryComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: InlinesEmbeddedEntryComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public subHub;
  public subHub$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allSubHubs$: Observable<SubHubCollection>;
  public parentSubHubs;
  public isMobile: Boolean;
  public bannerTextStyling;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allSubHubGQL: AllSubHubGQL,
    public getSubHubBySlugGQL: GetSubHubBySlugGQL,
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
     * passed to the getSubHubBySlug() method.
     */
    this.route$ = this.route.params.subscribe(params => {
      this.slug = params.slug || this.route.snapshot.data.slug;
      this._loadContent();
    });

    /**
     * Set styling for text if banner is present
     */
    this.bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
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
      this.subHub$ = this.getSubHubBySlug(this.slug).subscribe(data => {
        // Remove nulls from server in case of error.
        data.internalPagesCollection.items = data.internalPagesCollection.items.filter(item => item);
        data.externalPagesCollection.items = data.externalPagesCollection.items.filter(item => item);
        
        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText.links);

        this.pageTitleService.title = data.title;

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        } else {
          this.bannerImageUrl = undefined;
        }
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'SubHub';
      this.allSubHubs$ = this.getAllSubHubs();
      try { this.subHub$.unsubscribe(); } catch { }
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
    } catch { }
  }
}
