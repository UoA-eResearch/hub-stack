import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllFundingGQL,
  AllFundingSlugsGQL,
  GetFundingBySlugGQL,
  FundingCollection,
  Funding,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-fundings',
  templateUrl: './fundings.component.html',
  styleUrls: ['./fundings.component.scss']
})
export class FundingsComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
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
  
  constructor(
    public route: ActivatedRoute,
    public allFundingGQL: AllFundingGQL,
    public allFundingSlugsGQL: AllFundingSlugsGQL,
    public getFundingBySlugGQL: GetFundingBySlugGQL,
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
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404'])}
      });
      this.funding = this.getFundingBySlug(this.slug);
      this.getFundingBySlug(this.slug).subscribe(data => {

        // If Call To Action is an email address
        if (data.callToAction?.match( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          data['callToAction'] = 'mailto:' + data['callToAction'];
        }

        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);
        data.applicationDocumentsCollection.items = data.applicationDocumentsCollection.items.filter(item => item);
        
        this.detectDevice();

        this.bodyMediaService.setBodyMedia(data.bodyText?.links);
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Fundings');
      this.allFundings$ = this.getAllFundings();
      try { this.funding$.unsubscribe(); } catch {}
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
    } catch {}
  }
}
