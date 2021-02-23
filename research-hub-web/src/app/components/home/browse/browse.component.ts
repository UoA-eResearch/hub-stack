import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { 
  categoryOptionsGQL 
} from '@app/global/global-variables';
import { AllCategoriesGQL, CategoryCollection, EventCollection } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public title = 'Research Categories';
  public description = "The University of Auckland provides top-quality support to our research community. The ResearchHub is your gateway to research support at the University of Auckland. Here you can explore what's on offer by topic.";
  public categoryOptionsGQL = categoryOptionsGQL;
  public allCategories$: Observable<CategoryCollection>;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;

  constructor(
    private media: MediaObserver,
    public allCategoriesGQL: AllCategoriesGQL) {
  }

  async ngOnInit() {
    // Get all categories
    this.allCategories$ = this.getAllCategories();
  }

  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }
}