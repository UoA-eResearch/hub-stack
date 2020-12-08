import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, flatMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import {
  AllArticlesGQL,
  GetArticleBySlugGQL,
  GetArticleByIdGQL,
  ArticleCollection,
  Article,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public allArticles$: Observable<ArticleCollection>;
  public article$: Observable<Article>;
  public slug: string;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allArticlesGQL: AllArticlesGQL,
    public getArticleBySlugGQL: GetArticleBySlugGQL,
    public getArticleByIDGQL: GetArticleByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getArticleBySlug() method.
     */
    this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;

    /**
     * If this.slug is defined, we're loading an individual article,
     * therefore run the corresponding query. If not, return all articles.
     */
    if (!!this.slug) {
      this.getArticleBySlug(this.slug).subscribe(data => {
        this.article$ = this.getArticleByID(data.sys.id)
          .pipe(tap(res => this.appComponentService.setTitle(res.title)));
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Articles');
      this.allArticles$ = this.getAllArticles();
    }
  }

  /**
   * Function that returns all articles from the ArticleCollection as an observable
   * of type ArticleCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting article/slug-name.
   */
  public getAllArticles(): Observable<ArticleCollection> {
    try {
      return this.allArticlesGQL.fetch()
        .pipe(pluck('data', 'articleCollection')) as Observable<ArticleCollection>
    } catch (e) { console.error('Error loading all articles:', e) };
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's slug
   * as an observable of type Article. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /articles.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getArticleBySlug(slug: string): Observable<Article> {
    try {
      return this.getArticleBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.articleCollection.items)) as Observable<Article>;
    } catch (e) { console.error(`Error loading article ${slug}:`, e); }
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's ID
   * as an observable of type Article. This is then unwrapped with the async pipe.
   * ID is retrieved by subscribing to 'getArticleBySlug'.
   */
  public getArticleByID(id: string): Observable<Article> {
    try {
      return this.getArticleByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.article)) as Observable<Article>;
    } catch (e) { console.error(`Error loading article ${id}:`, e); }
  }
}

