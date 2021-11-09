import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AllCaseStudiesGQL,
  AllCaseStudySlugsGQL,
  CaseStudy,
  CaseStudyCollection,
  GetCaseStudyBySlugGQL
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { catchError, flatMap, pluck } from 'rxjs/operators';
import supportsWebP from 'supports-webp';


@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;
  public isMobile: Boolean;
  public bannerTextStyling;
  public slug: string;
  public caseStudy;
  public caseStudy$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allCaseStudies$: Observable<CaseStudyCollection>;
  public parentSubHubs;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allCaseStudyGQL: AllCaseStudiesGQL,
    public allCaseStudySlugsGQL: AllCaseStudySlugsGQL,
    public getCaseStudyBySlugGQL: GetCaseStudyBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.detectDevice();
    this.detectWebP();

    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
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
    this.getAllCaseStudySlugs().subscribe(data => {
      let slugs = [];
      data.items.forEach(data => {
        slugs.push(data.slug)
      })
      if (!slugs.includes(this.slug)) { this.router.navigate(['error/404']) }
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

      // Set banner image URL for webp format if webp is supported
      if (data.banner?.url) {
        this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
      } else {
        this.bannerImageUrl = undefined;
      }

      // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
      this.bodyMediaService.buildLinkMaps(data.bodyText?.links);
      this.bodyMediaService.buildLinkMaps(data.references?.links);

      this.pageTitleService.title = data.title;
    });
    this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);

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
    } catch { }
  }
}
