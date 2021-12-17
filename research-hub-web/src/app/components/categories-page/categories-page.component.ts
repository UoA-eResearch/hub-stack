import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '@services/search.service';
import {
  AllCategoriesGQL,
  Category,
  GetHomepageGQL,
  Maybe
} from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageTitleService } from '@services/page-title.service';
import { notEmpty } from '@app/global/notEmpty';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  public title: string = 'Research Categories';
  public description: Maybe<string> | undefined;
  public allCategories$: Observable<Category[]>;
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
        map(x => x?.data?.homepageCollection?.items[0])
      ).subscribe({
        next: result => {
          this.description = result?.researchCategories;
        },
        error: err => {
          console.error(err);
          const status: number = err['status'] ? err['status'] : 500;
          this.router.navigate(['error', status]);
        }
      })
    )
  }

  public getAllCategories(): Observable<Category[]> {
    return this.allCategoriesGQL.fetch().pipe(
        map(result => result?.data?.categoryCollection?.items.filter(notEmpty) as Category[])
      )
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
