import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, filter, first, flatMap, reduce } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  AllArticlesGQL,
  AllArticlesQuery,
  GetArticleBySlugGQL,
  GetArticleBySlugQuery,
  ArticleCollection,
  Article
} from '../../graphql/schema';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public allArticles$: Observable<ArticleCollection>;
  public article$: Observable<Article>;
  public slug: string;

  constructor(
    public route: ActivatedRoute,
    public allArticlesGQL: AllArticlesGQL,
    public getArticleBySlugGQL: GetArticleBySlugGQL
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });

    /**
     * If this.slug is defined, we're loading an individual article,
     * therefore run the corresponding query. If not, return all articles.
     */
    try {
      if (this.slug) {
        this.article$ = this.getArticleBySlugGQL.fetch({ slug: this.slug })
          .pipe(flatMap(x => x.data.articleCollection.items)) as Observable<Article>;
      } else {
        this.allArticles$ = this.allArticlesGQL.fetch()
          .pipe(pluck('data', 'articleCollection')) as Observable<ArticleCollection>;
      }
    } catch (e) { console.error('caught it!!!' + e) };

  }
}
