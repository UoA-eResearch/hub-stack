import { Component, Input, OnInit } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { AllCategoriesGQL, CategoryCollection } from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  public title: string = 'Research Categories';
  public description: string = 'The ResearchHub is your gateway to research support at the University of Auckland. Explore by topic.';
  public allCategories$: Observable<CategoryCollection>;
  public events;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public searchBarService: SearchBarService
  ) { }

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
