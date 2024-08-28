import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { notEmpty } from '@app/global/notEmpty';
import {
  Process,
  ProcessRelatedProcessesItem,
  GetProcessBySlugGQL,
  OfficialDocuments,
  OrgUnit,
  Person, ArticleRelatedItemsItem,
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
  public process: Process;
  public supportsWebp: Boolean;
  public bannerImageUrl: string | undefined;

  public relatedItems: ArticleRelatedItemsItem[];
  public relatedProcesses: ProcessRelatedProcessesItem[];
  public relatedContacts: Person[];
  public relatedOrgs: OrgUnit[];
  public relatedDocs: OfficialDocuments[];

  constructor(
    public route: ActivatedRoute,
    public getProcessBySlugGQL: GetProcessBySlugGQL,
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
        ? this.loadProcess(slug)
        : throwError(() => new Error('No slug included in URL. Redirect to Collection page.'))
      )
    ).subscribe({
      next: (process: Process) => this.process = process,
      error: (error: Error) => {
        if (error instanceof ApolloError && error.message.includes('Authentication required')) {
          console.warn('Waiting for redirect to Login page');
        } else if (error.message.includes('No slug')) {
          console.warn('Waiting for redirect to Processs Collection page');
          this.router.navigate(['process', 'list'])
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

  private loadProcess(slug: string): Observable<Process> {
    return this.getProcessBySlug(slug).pipe(
      map(data => {

        // Strip nulls from related collection data.
        if (data.relatedContactsCollection) this.relatedContacts = data.relatedContactsCollection.items.filter(notEmpty);
        if (data.relatedOrgsCollection) this.relatedOrgs = (data.relatedOrgsCollection.items.filter(notEmpty)).filter(item => item.name);
        // if (data.relatedProcessesCollection) this.relatedProcesses = data.relatedProcessesCollection.items.filter(notEmpty);
        // if (data.relatedItemsCollection) this.relatedItems = data.relatedItemsCollection.items.filter(notEmpty);

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
   * Function that returns an individual process from the ProcessCollection by it's slug
   * as an observable of type Process.
   *
   * @param slug The process's slug. Retrieved from the route parameter of the same name.
   */
  public getProcessBySlug(slug: string): Observable<Process> {
    return this.getProcessBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x?.data?.processCollection) {
          if (x.data.processCollection.items.length === 0) {
            throw new Error(`Not found. Could not find process with slug "${slug}"`)
          } else {
            return x.data.processCollection.items[0] as Process
          }
        } else {
          throw new Error('Unable to fetch processCollection');
        }
      })
    );
  }
}

const test  = {
  relatedProcessesCollection: {
    "items": [
      {
        "__typename": "SubHub",
        "slug": "open-access",
        "title": "Open Access",
        "summary": "Learn about what Open Access (OA) is, why and how to make your work open and how to comply with the University's OA policy and other funder OA mandates.",
        "ssoProtected": false,
        "searchable": true,
        "banner": {
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/LyVHjs5bw6wzAQi8zWi73/f3817c9dddb4fd29964644b74f376030/simon-berger-twukN12EN7c-unsplash.jpg",
          "__typename": "Asset"
        }
      },
      {
        "__typename": "SubHub",
        "slug": "guide-to-managing-research-data",
        "title": "Managing research data and artefacts",
        "summary": "A guide to services and information to help you to manage your research data during each phase of the research data lifecycle.",
        "ssoProtected": false,
        "searchable": true,
        "banner": {
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/1PAusgrQfpbtD70mGFax5f/30dac068c182daf1d34b167bea0657ec/starry-sky-2051448_1920.jpg",
          "__typename": "Asset"
        }
      }
    ],
    "__typename": "ProcessRelatedContactsCollection"
  }
}

const test2  = {
  relatedItemsCollection: {
    "items": [
      {
        "__typename": "SubHub",
        "slug": "open-access",
        "title": "Open Access",
        "summary": "Learn about what Open Access (OA) is, why and how to make your work open and how to comply with the University's OA policy and other funder OA mandates.",
        "ssoProtected": false,
        "searchable": true,
        "banner": {
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/LyVHjs5bw6wzAQi8zWi73/f3817c9dddb4fd29964644b74f376030/simon-berger-twukN12EN7c-unsplash.jpg",
          "__typename": "Asset"
        }
      },
      {
        "__typename": "SubHub",
        "slug": "guide-to-managing-research-data",
        "title": "Managing research data and artefacts",
        "summary": "A guide to services and information to help you to manage your research data during each phase of the research data lifecycle.",
        "ssoProtected": false,
        "searchable": true,
        "banner": {
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/1PAusgrQfpbtD70mGFax5f/30dac068c182daf1d34b167bea0657ec/starry-sky-2051448_1920.jpg",
          "__typename": "Asset"
        }
      }
    ],
    "__typename": "ArticleRelatedItemsCollection"
  }
}
