import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funding, GetFundingBySlugGQL } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { GraphQLError } from 'graphql';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss']
})
export class FundingComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public funding: Funding;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public getFundingBySlugGQL: GetFundingBySlugGQL,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
  ) {
    this.detectWebP();

    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  ngOnInit() {
    this.subscriptions.add(this.route.params.pipe(
      map((params) => {
        return (params.slug || this.route.snapshot.data.slug) as string;
      }),
      switchMap((slug) => this.loadFunding(slug))
    ).subscribe({
      next: (funding: Funding) => this.funding = funding,
      error: (error: Error) => {
        console.error(error)
        if (error.message.includes('Not found')) {
          this.router.navigate(['error', 404]);
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadFunding(slug: string): Observable<Funding> {
    return this.getFundingBySlug(slug).pipe(
      map((data) => {
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
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);
        this.bodyMediaService.buildLinkMaps(data.purpose?.links);
        this.bodyMediaService.buildLinkMaps(data.deadlines?.links);

        this.pageTitleService.title = data.title;

        return data;
      })
    );
  }

  /**
   * Function that returns an individual funding page from the FundingCollection by it's slug
   * as an observable of type Funding.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getFundingBySlug(slug: string): Observable<Funding> {
    if (!slug) {
      this.router.navigate(['funding', 'list'])
    }
    return this.getFundingBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x.data.fundingCollection.items.length === 0) {
          throw new Error(`Not found. Could not find funding with slug "${slug}"`)
        } else {
          return x.data.fundingCollection.items[0] as Funding
        }
      })
    );
  }
}
