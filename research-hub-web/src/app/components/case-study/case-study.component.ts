import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, map, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllCaseStudiesGQL,
  GetCaseStudyBySlugGQL,
  CaseStudyCollection,
  CaseStudy,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';

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

  public slug: string;
  public caseStudy: Observable<CaseStudy>;
  public caseStudy$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allCaseStudies$: Observable<CaseStudyCollection>;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allCaseStudiesGQL: AllCaseStudiesGQL,
    public getCaseStudyBySlugGQL: GetCaseStudyBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getCaseStudyBySlug() method.
     */
      this.route$ = this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the CaseStudy/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual CaseStudy,
     * therefore run the corresponding query. If not, return all CaseStudies.
     */
    if (!!this.slug) {
      this.caseStudy = this.getCaseStudyBySlug(this.slug);
      this.caseStudy$ = this.caseStudy.subscribe(data => {
          this.bodyMediaService.setBodyMedia(data.bodyText.links);
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Case Studies');
      this.allCaseStudies$ = this.getAllCaseStudies();
      try { this.caseStudy$.unsubscribe(); } catch {}
    }
  }

  /**
   * Function that returns all CaseStudies from the CaseStudyCollection as an observable
   * of type CaseStudyCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting CaseStudy/slug-name.
   */
  public getAllCaseStudies(): Observable<CaseStudyCollection> {
    try {
      return this.allCaseStudiesGQL.fetch()
        .pipe(pluck('data', 'caseStudyCollection')) as Observable<CaseStudyCollection>
    } catch (e) { console.error('Error loading all CaseStudies:', e) };
  }

  /**
   * Function that returns an individual CaseStudy from the CaseStudyCollection by it's slug
   * as an observable of type CaseStudy. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /CaseStudies.
   *
   * @param slug The CaseStudy's slug. Retrieved from the route parameter of the same name.
   */
  public getCaseStudyBySlug(slug: string): Observable<CaseStudy> {
    try {
      return this.getCaseStudyBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.caseStudyCollection.items)) as Observable<CaseStudy>;
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