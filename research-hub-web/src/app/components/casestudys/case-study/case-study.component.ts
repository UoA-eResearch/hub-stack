import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { CaseStudy, GetCaseStudyBySlugGQL } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';


@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
  public caseStudy: CaseStudy;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public getCaseStudyBySlugGQL: GetCaseStudyBySlugGQL,
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
      switchMap((slug) => this.loadCaseStudy(slug))
    ).subscribe({
      next: (caseStudy: CaseStudy) => this.caseStudy = caseStudy,
      error: (error: Error) => {
        if (error instanceof ApolloError && error.message.includes('Authentication required')) {
          console.warn('Waiting for redirect to Login page');
        } else if (error.message.includes('Not found')) {
          console.error(error);
          this.router.navigate(['error', 404]);
        } else {
          console.error(error);
          this.router.navigate(['error', 500]);
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadCaseStudy(slug: string): Observable<CaseStudy> {
    return this.getCaseStudyBySlug(slug).pipe(
      map(data => {
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

        return data;
      })
    );
  }

  /**
   * Function that returns an individual case study from the CaseStudyCollection by it's slug
   * as an observable of type CaseStudy.
   *
   * @param slug The case study's slug. Retrieved from the route parameter of the same name.
   */
  public getCaseStudyBySlug(slug: string): Observable<CaseStudy> {
    if (!slug) {
      this.router.navigate(['casestudy', 'list'])
    }
    return this.getCaseStudyBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x.data.caseStudyCollection.items.length === 0) {
          throw new Error(`Not found. Could not find case study with slug "${slug}"`)
        } else {
          return x.data.caseStudyCollection.items[0] as CaseStudy
        }
      })
    );
  }
}
