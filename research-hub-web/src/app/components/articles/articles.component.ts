import { Component, OnInit } from '@angular/core';
import { AllArticlesGQL, AllArticlesQuery, ArticleCollection } from '../../graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public allArticles$: Observable<AllArticlesQuery['articleCollection']>;

  constructor(public allArticlesGQL: AllArticlesGQL) { }

  ngOnInit(): void {
    this.allArticles$ = this.allArticlesGQL.fetch().pipe(pluck('data', 'articleCollection'));
  }
}
