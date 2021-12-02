import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { notEmpty } from '@app/global/notEmpty';
import { Article, ArticleRelatedItemsItem, GetArticleBySlugGQL, OfficialDocuments, OrgUnit, Person } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public bannerTextStyling = 'color: white; text-shadow: 0px 0px 8px #333333;';
  public article: Article;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  public relatedItems: ArticleRelatedItemsItem[];
  public relatedContacts: Person[];
  public relatedOrgs: OrgUnit[];
  public relatedDocs: OfficialDocuments[];

  constructor(
    public route: ActivatedRoute,
    public getArticleBySlugGQL: GetArticleBySlugGQL,
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
        ? this.loadArticle(slug)
        : throwError(new Error('No slug included in URL. Redirect to Collection page.'))
      )
    ).subscribe({
      next: (article: Article) => this.article = article,
      error: (error: Error) => {
        if (error instanceof ApolloError && error.message.includes('Authentication required')) {
          console.warn('Waiting for redirect to Login page');
        } else if (error.message.includes('No slug')) {
          console.warn('Waiting for redirect to Articles Collection page');
          this.router.navigate(['article', 'list'])
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

  private loadArticle(slug: string): Observable<Article> {
    return this.getArticleBySlug(slug).pipe(
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
        }

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title ?? '';

        return data;
      })
    );
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's slug
   * as an observable of type Article.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getArticleBySlug(slug: string): Observable<Article> {
    return this.getArticleBySlugGQL.fetch({ slug }).pipe(
      map(x => {
        if (x.data.articleCollection) {
          if (x.data.articleCollection.items.length === 0) {
            throw new Error(`Not found. Could not find article with slug "${slug}"`)
          } else {
            return x.data.articleCollection.items[0] as Article
          }
        } else {
          throw new Error('Unable to fetch articleCollection');
        }
      })
    );
  }
}
