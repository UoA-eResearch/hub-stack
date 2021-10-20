import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BlocksEmbeddedAssetComponent } from '@components/shared/body-media/blocks-embedded-asset/blocks-embedded-asset.component';
import { BlocksEmbeddedEntryComponent } from '@components/shared/body-media/blocks-embedded-entry/blocks-embedded-entry.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  AllFundingGQL,
  AllFundingSlugsGQL,
  Funding,
  FundingCollection,
  GetFundingBySlugGQL
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
  selector: 'app-fundings',
  templateUrl: './fundings.component.html',
  styleUrls: ['./fundings.component.scss']
})
export class FundingsComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BlocksEmbeddedAssetComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BlocksEmbeddedEntryComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public funding;
  public funding$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allFundings$: Observable<FundingCollection>;
  public parentSubHubs;
  public isMobile: Boolean;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allFundingGQL: AllFundingGQL,
    public allFundingSlugsGQL: AllFundingSlugsGQL,
    public getFundingBySlugGQL: GetFundingBySlugGQL,
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
     * passed to the getFundingBySlug() method.
    */
    this.route$ = this.route.params.subscribe(params => {
      this.slug = params.slug || this.route.snapshot.data.slug;
      this._loadContent();
    });
  }

  /**
   * Function that loads the Funding/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual Funding,
     * therefore run the corresponding query. If not, return all Fundings.
     */
    if (!!this.slug) {
      // Check if the article slug is valid otherwise redirect to 404
      this.getAllFundingSlugs().subscribe(data => {
        let slugs = [];
        data.items.forEach(data => {
          slugs.push(data.slug)
        })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404']) }
      });
      this.funding = this.getFundingBySlug(this.slug);
      this.getFundingBySlug(this.slug).subscribe(data => {

        // If Call To Action is an email address
        if (data.callToAction?.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          data['callToAction'] = 'mailto:' + data['callToAction'];
        }

        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);
        data.applicationDocumentsCollection.items = data.applicationDocumentsCollection.items.filter(item => item);

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        } else {
          this.bannerImageUrl = undefined;
        }

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText);
        this.bodyMediaService.buildLinkMaps(data.purpose);
        this.bodyMediaService.buildLinkMaps(data.deadlines);

        this.pageTitleService.title = data.title;
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'Fundings';
      this.allFundings$ = this.getAllFundings();
      try { this.funding$.unsubscribe(); } catch { }
    }
  }

  /**
   * Function that returns all Fundings from the FundingCollection as an observable
   * of type FundingCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting Funding/slug-name.
   */
  public getAllFundings(): Observable<FundingCollection> {
    try {
      return this.allFundingGQL.fetch()
        .pipe(pluck('data', 'fundingCollection')) as Observable<FundingCollection>
    } catch (e) { console.error('Error loading all Fundings:', e) };
  }

  /**
   * Function that returns all funding slugs from the FundingCollection as an observable
   * of type FundingCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllFundingSlugs(): Observable<FundingCollection> {
    try {
      return this.allFundingSlugsGQL.fetch()
        .pipe(pluck('data', 'fundingCollection')) as Observable<FundingCollection>
    } catch (e) { console.error('Error loading all fundings:', e) };
  }

  /**
   * Function that returns an individual Funding from the FundingCollection by it's slug
   * as an observable of type Funding. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /Funding.
   *
   * @param slug The Funding's slug. Retrieved from the route parameter of the same name.
   */
  public getFundingBySlug(slug: string): Observable<Funding> {
    try {
      return this.getFundingBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.fundingCollection.items)) as Observable<Funding>;
    } catch (e) { console.error(`Error loading Funding ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.funding$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch { }
  }
}
