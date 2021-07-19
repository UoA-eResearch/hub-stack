import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCategoriesGQL, CategoryCollection, Category, GetHomepageGQL, Homepage } from '@app/graphql/schema';
import { flatMap, pluck } from 'rxjs/operators';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  @Input() description: string;

  public title = 'Research Categories';
  public allCategories$: Observable<CategoryCollection>;
  public events;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public searchBarService: SearchBarService
  ) {}

  async ngOnInit() {
    this.allCategories$ = this.getAllCategories();
  }

  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  getSearchQueryParams(item: any) {
    return { researchCategories: [item.displayOrder] };
  }
}
