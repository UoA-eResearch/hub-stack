import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCategoriesGQL, CategoryCollection } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public title = 'Research Categories';
  public description = "The University of Auckland provides top-quality support to our research community. The ResearchHub is your gateway to research support at the University of Auckland. Here you can explore what's on offer by topic.";
  public allCategories$: Observable<CategoryCollection>;

  constructor(public allCategoriesGQL: AllCategoriesGQL) {}

  async ngOnInit() {
    this.allCategories$ = this.getAllCategories();
  }

  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }
}