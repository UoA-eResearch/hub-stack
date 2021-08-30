import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  CaseStudy,
  GetCaseStudyReferencesBySlugGQL
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { PageTitleService } from '@services/page-title.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-case-study-references',
  templateUrl: './case-study-references.component.html',
  styleUrls: ['./case-study-references.component.scss']
})
export class CaseStudyReferencesComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public caseStudyReferences;
  public caseStudyReferences$: Subscription;
  public json;
  public route$: Subscription;

  constructor(
    public route: ActivatedRoute,
    public getCaseStudyReferencesBySlugGQL: GetCaseStudyReferencesBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getCaseStudyReferencesBySlug() method.
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
    this.caseStudyReferences = this.getCaseStudyReferencesBySlug(this.slug);
    this.getCaseStudyReferencesBySlug(this.slug).subscribe(data => {
      this.bodyMediaService.setBodyMedia(data.references?.links);
    });
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
  public getCaseStudyReferencesBySlug(slug: string): Observable<CaseStudy> {
    try {
      return this.getCaseStudyReferencesBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.caseStudyCollection.items)) as Observable<CaseStudy>;
    } catch (e) { console.error(`Error loading Case Study References ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.caseStudyReferences$.unsubscribe();
      this.route$.unsubscribe();
    } catch { }
  }
}
