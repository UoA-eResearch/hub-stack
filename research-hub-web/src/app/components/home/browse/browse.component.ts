import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCategoriesGQL, CategoryCollection, Category } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public title = 'Research Categories';
  public description = "The University of Auckland provides top-quality support to our research community. The ResearchHub is your gateway to research support at the University of Auckland. Here you can explore what's on offer by topic.";
  public allCategories$: Observable<CategoryCollection>;
  public events;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public searchBarService: SearchBarService) {}

  async ngOnInit() {
    this.allCategories$ = this.getAllCategories();

    // Only add the below code if 'Events' is removed from contentful as a category type

    // this.getAllCategories().subscribe(data => {
    //   this.events = ({
    //     "name": "Events",
    //     "description": "See all upcoming events at the ResearchHub."
    //   }) as unknown as Category;
    //   data.items.push(this.events);
    // });
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