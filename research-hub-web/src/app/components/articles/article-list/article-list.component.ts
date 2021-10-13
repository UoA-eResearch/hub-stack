import { Component, OnInit } from '@angular/core';
import { AllArticlesGQL, ArticleCollection } from '@app/graphql/schema';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public articles: ArticleCollection

  constructor(
    private allArticlesGQL: AllArticlesGQL
  ) { }

  ngOnInit(): void {
    this.allArticlesGQL.fetch().pipe(
      map((result) => result.data.articleCollection as ArticleCollection)
    ).subscribe(collection => this.articles = collection)
  }

}
