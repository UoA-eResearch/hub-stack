import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllCaseStudiesGQL,
  AllCaseStudySlugsGQL,
  GetCaseStudyBySlugGQL,
  CaseStudyCollection,
  CaseStudy,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public isMobile: Boolean;
  public bannerTextStyling;
  public slug: string;
  public caseStudy;
  public caseStudy$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allCaseStudies$: Observable<CaseStudyCollection>;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allCaseStudyGQL: AllCaseStudiesGQL,
    public allCaseStudySlugsGQL: AllCaseStudySlugsGQL,
    public getCaseStudyBySlugGQL: GetCaseStudyBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService
  ) { this.detectDevice(); }
  
  /**
   * Detect if device is Mobile
   */
  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getCaseStudyBySlug() method.
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
   * Function that loads the CaseStudy/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual CaseStudy,
     * therefore run the corresponding query. If not, return all CaseStudy.
     */
    if (!!this.slug) {
      this.getAllCaseStudySlugs().subscribe(data => {
        let slugs = [];
          data.items.forEach(data => {
            slugs.push(data.slug)
          })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404'])}
      });
      this.caseStudy = this.getCaseStudyBySlug(this.slug);

      /**
       * If the page is SSO Protected then check if the user is authenticated
       */
      this.caseStudy$ = this.getCaseStudyBySlug(this.slug).subscribe(data => {
        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);
        
        this.detectDevice();
        this.bodyMediaService.setBodyMedia(data.bodyText.links);
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Case Studies');
      this.allCaseStudies$ = this.getAllCaseStudy();
      try { this.caseStudy$.unsubscribe(); } catch {}
    }
  }

  /**
   * Function that returns all CaseStudy from the CaseStudyCollection as an observable
   * of type CaseStudyCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting CaseStudy/slug-name.
   */
  public getAllCaseStudy(): Observable<CaseStudyCollection> {
    try {
      return this.allCaseStudyGQL.fetch()
        .pipe(pluck('data', 'caseStudyCollection')) as Observable<CaseStudyCollection>
    } catch (e) { console.error('Error loading all CaseStudy:', e) };
  }

  /**
   * Function that returns all CaseStudy slugs from the CaseStudyCollection as an observable
   * of type CaseStudyCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllCaseStudySlugs(): Observable<CaseStudyCollection> {
    try {
      return this.allCaseStudySlugsGQL.fetch()
        .pipe(pluck('data', 'caseStudyCollection')) as Observable<CaseStudyCollection>
    } catch (e) { console.error('Error loading all case studies:', e) };
  }

  /**
   * Function that returns an individual CaseStudy from the CaseStudyCollection by it's slug
   * as an observable of type CaseStudy. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /CaseStudy.
   *
   * @param slug The CaseStudy's slug. Retrieved from the route parameter of the same name.
   */
  public getCaseStudyBySlug(slug: string): Observable<CaseStudy> {
    try {
      return this.getCaseStudyBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.caseStudyCollection.items), catchError(() => (this.router.navigate(['/error/500'])))) as Observable<CaseStudy>;
    } catch (e) { console.error(`Error loading CaseStudy ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.caseStudy$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch {}
  }
}