import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllArticlesGQL, ArticleCollection } from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  public articles: ArticleCollection;
  public title: string = 'Article Collection';

  private subscription = new Subscription();

  constructor(
    private allArticlesGQL: AllArticlesGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.articles = collection)
    );
  }

  public loadContent(): Observable<ArticleCollection> {
    return this.allArticlesGQL.fetch().pipe(
      map((result) => result.data.articleCollection as ArticleCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
