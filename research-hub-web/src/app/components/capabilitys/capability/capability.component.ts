import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { notEmpty } from '@app/global/notEmpty';
import { Capability, CapabilityRelatedItemsItem, GetCapabilityBySlugGQL, OfficialDocuments, OrgUnit, Person } from '@app/graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { map, Observable, Subscription, switchMap, throwError } from 'rxjs';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-capability',
  templateUrl: './capability.component.html',
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
  public capability: Capability;
  public supportsWebp: Boolean;
  public bannerImageUrl: string | undefined;

  public relatedItems: CapabilityRelatedItemsItem[];
  public relatedContacts: Person[];
  public relatedOrgs: OrgUnit[];
  public relatedDocs: OfficialDocuments[];

  constructor(
    public route: ActivatedRoute,
    public getCapabilityBySlugGQL: GetCapabilityBySlugGQL,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router
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
      switchMap((slug) => slug
        ? this.loadCapability(slug)
        : throwError(() => new Error('No slug included in URL. Redirect to Collection page.'))
      )
    ).subscribe({
      next: (capability: Capability) => this.capability = capability,
      error: (error: Error) => {
        if (error instanceof ApolloError && error.message.includes('Authentication required')) {
          console.warn('Waiting for redirect to Login page');
        } else if (error.message.includes('No slug')) {
          console.warn('Waiting for redirect to Capability Collection page');
          this.router.navigate(['capability', 'list'])
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadCapability(slug: string): Observable<Capability> {
    return this.getCapabilityBySlug(slug).pipe(
      map(data => {
        // Strip nulls from related collection data.
        if (data.relatedContactsCollection) this.relatedContacts = data.relatedContactsCollection.items.filter(notEmpty);
        if (data.relatedDocsCollection) this.relatedDocs = (data.relatedDocsCollection.items.filter(notEmpty)).filter(item => item.title);
        if (data.relatedItemsCollection) this.relatedItems = data.relatedItemsCollection.items.filter(notEmpty);
        if (data.relatedOrgsCollection) this.relatedOrgs = (data.relatedOrgsCollection.items.filter(notEmpty)).filter(item => item.name);

        // If Call To Action is an email address
        if (data.callToAction?.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          data['callToAction'] = 'mailto:' + data['callToAction'];
        }

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        } else {
          this.bannerImageUrl = undefined;
        }

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title ?? '';

        return data;
      })
    );
  }

  /**
   * Function that returns an individual capability from the CapabilityCollection by it's slug
   * as an observable of type Capability.
   *
   * @param slug The capability's slug. Retrieved from the route parameter of the same name.
   */
  public getCapabilityBySlug(slug: string): Observable<Capability> {
    return this.getCapabilityBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x?.data?.capabilityCollection) {
          if (x.data.capabilityCollection.items.length === 0) {
            throw new Error(`Not found. Could not find capability with slug "${slug}"`)
          } else {
            return x.data.capabilityCollection.items[0] as Capability
          }
        } else {
          throw new Error('Unable to fetch capabilityCollection');
        }
      })
    );
  }
}
