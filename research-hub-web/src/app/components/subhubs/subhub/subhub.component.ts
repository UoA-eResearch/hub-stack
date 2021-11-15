import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSubHubBySlugGQL, SubHub } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-subhub',
  templateUrl: './subhub.component.html',
  styleUrls: ['./subhub.component.scss']
})
export class SubhubComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public subHub: SubHub;
  public bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public getSubHubBySlugGQL: GetSubHubBySlugGQL,
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

  async ngOnInit() {
    this.subscriptions.add(this.route.params.pipe(
      map((params) => {
        return (params.slug || this.route.snapshot.data.slug) as string;
      }),
      switchMap((slug) => this.loadSubHub(slug))
    ).subscribe({
      next: (subHub: SubHub) => this.subHub = subHub,
      error: (error) => {
        console.error(error);
        this.router.navigate(['error', 404]);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadSubHub(slug: string): Observable<SubHub> {
    return this.getSubHubBySlug(slug).pipe(
      map((data) => {
        // Remove nulls from server in case of error.
        data.internalPagesCollection.items = data.internalPagesCollection.items.filter(item => item);
        data.externalPagesCollection.items = data.externalPagesCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title;

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        } else {
          this.bannerImageUrl = undefined;
        }

        return data;
      })
    );
  }

  /**
   * Function that returns an individual subhub from the SubHubCollection by it's slug
   * as an observable of type SubHub.
   *
   * @param slug The subhub's slug. Retrieved from the route parameter of the same name.
   */
  public getSubHubBySlug(slug: string): Observable<SubHub> {
    if (!slug) {
      this.router.navigate(['subhub', 'list'])
    }
    return this.getSubHubBySlugGQL.fetch({ slug }).pipe(
      mergeMap(x =>
        x.data.subHubCollection.items.length === 0
          ? throwError(`Could not load article with slug "${slug}"`)
          : of(x.data.subHubCollection.items[0])
      )
    ) as Observable<SubHub>;
  }
}
