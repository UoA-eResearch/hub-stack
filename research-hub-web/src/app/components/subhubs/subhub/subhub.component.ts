import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { GetSubHubBySlugGQL, SubHub } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
      switchMap((slug) => slug
        ? this.loadSubHub(slug)
        : throwError(new Error('No slug included in URL. Redirect to Collection page.'))
      )
    ).subscribe({
      next: (subHub: SubHub) => this.subHub = subHub,
      error: (error: Error) => {
        if (error instanceof ApolloError && error.message.includes('Authentication required')) {
          console.warn('Waiting for redirect to Login page');
        } else if (error.message.includes('No slug')) {
          console.warn('Waiting for redirect to SubHub Collection page');
          this.router.navigate(['subhub', 'list'])
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

  private loadSubHub(slug: string): Observable<SubHub> {
    return this.getSubHubBySlug(slug).pipe(
      map((data) => {
        // Remove nulls from server in case of error.
        if (data.internalPagesCollection) data.internalPagesCollection.items = data.internalPagesCollection.items.filter(item => item);
        if (data.externalPagesCollection) data.externalPagesCollection.items = data.externalPagesCollection.items.filter(item => item);
        if (data.relatedItemsCollection) data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        if (data.relatedContactsCollection) data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        if (data.relatedOrgsCollection) data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item && item.name);
        if (data.relatedDocsCollection) data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item && item.title);

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title ?? '';

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
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
    return this.getSubHubBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x.data.subHubCollection) {
          if (x.data.subHubCollection.items.length === 0) {
            throw new Error(`Not found. Could not find subHub with slug "${slug}"`)
          } else {
            return x.data.subHubCollection.items[0] as SubHub
          }
        } else {
          throw new Error('Unable to fetch subHubCollection');
        }
      })
    );
  }
}
