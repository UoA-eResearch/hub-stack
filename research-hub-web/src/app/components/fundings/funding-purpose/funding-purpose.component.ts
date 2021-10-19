import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  Funding,
  GetFundingPurposeBySlugGQL
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-funding-purpose',
  templateUrl: './funding-purpose.component.html',
  styleUrls: ['./funding-purpose.component.scss']
})
export class FundingPurposeComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public fundingPurpose;
  public fundingPurpose$: Subscription;
  public json;
  public route$: Subscription;

  constructor(
    public route: ActivatedRoute,
    public getFundingPurposeBySlugGQL: GetFundingPurposeBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
  ) { }

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
    this.fundingPurpose = this.getFundingPurposeBySlug(this.slug);
    this.getFundingPurposeBySlug(this.slug).subscribe(data => {
      data.purpose = this.bodyMediaService.resolveNodeData(data.purpose);
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
  public getFundingPurposeBySlug(slug: string): Observable<Funding> {
    try {
      return this.getFundingPurposeBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.fundingCollection.items)) as Observable<Funding>;
    } catch (e) { console.error(`Error loading Funding Purpose ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.fundingPurpose$.unsubscribe();
      this.route$.unsubscribe();
    } catch { }
  }
}
