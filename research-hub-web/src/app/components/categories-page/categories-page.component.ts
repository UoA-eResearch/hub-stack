import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '@services/search.service';
import {
  AllCategoriesGQL,
  CategoryCollection,
  GetHomepageGQL,
  Maybe
} from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  public title: string = 'Research Categories';
  public description: Maybe<string> | undefined;
  public allCategories$: Observable<CategoryCollection>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public pageTitleService: PageTitleService,
    private getHomepageGQL: GetHomepageGQL,
    public searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageTitleService.title = this.title;
    this.allCategories$ = this.getAllCategories();
    this.subscriptions.add(
      this.getHomepageGQL.fetch().pipe(
        map(x => x.data.homepageCollection?.items[0])
      ).subscribe(result => {
        this.description = result?.researchCategories;
      })
    )
  }

  public getAllCategories(): Observable<CategoryCollection> {
    return this.allCategoriesGQL.fetch()
      .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
  }

  public search(id: string): void {
    this.router.navigate(
      ['/search'],
      {
        queryParams: this.searchService.generateQueryParams('', {category: [id], stage: [], relatedOrgs: []})
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
