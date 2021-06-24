import { Component, OnInit } from '@angular/core';
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
  public title = 'Research Categories';
  public description = "";
  public allCategories$: Observable<CategoryCollection>;
  public events;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public searchBarService: SearchBarService,
    public getHomepageGQL: GetHomepageGQL) {}

  async ngOnInit() {
    this.allCategories$ = this.getAllCategories();
    this.getHomepage().subscribe(data => {
      this.description = data.researchCategories;
    })
  }

  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) }
  }

  // Get homepage data
  public getHomepage(): Observable<Homepage> {
    try {
      return this.getHomepageGQL.fetch()
        .pipe(flatMap(x => x.data.homepageCollection.items)) as Observable<Homepage>
    } catch (e) { console.error('Error loading homepage:', e) }
  }

  getSearchQueryParams(item: any) {
    return { researchCategories: [item.displayOrder] };
  }
}