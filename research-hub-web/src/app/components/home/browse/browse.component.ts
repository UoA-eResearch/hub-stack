import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { LayoutService } from '@services/layout.service';
import { 
  categoryOptions,
  categoryOptionsGQL 
} from '@app/global/global-variables';
import { AllCategoriesGQL, AllEventsGQL, CategoryCollection, EventCollection } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  public title = 'Research Categories';
  public description = "The University of Auckland provides top-quality support to our research community. The ResearchHub is your gateway to research support at the University of Auckland. Here you can explore what's on offer by topic.";
  public categoryOptions = categoryOptions;
  public categoryOptionsGQL = categoryOptionsGQL;
  public allCategories$: Observable<CategoryCollection>;
  public allEvents$: Observable<EventCollection>;
  private mediaSub: Subscription;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;

  constructor(
    private media: MediaObserver,
    private layoutService: LayoutService,
    public allCategoriesGQL: AllCategoriesGQL,
    public allEventsGQL: AllEventsGQL,) {
  }

  async ngOnInit() {
    this.updateCols(this.layoutService.getMQAlias());

    this.mediaSub = this.media.media$.subscribe((change: MediaChange) => {
      this.updateCols(change.mqAlias);
    });

    // Get all categories
    this.allCategories$ = this.getAllCategories();

    // Get all Events
    this.allEvents$ = this.getAllEvents();
  }

  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  public getAllEvents(): Observable<EventCollection> {
    try {
      return this.allEventsGQL.fetch()
        .pipe(pluck('data', 'eventCollection')) as Observable<EventCollection>
    } catch (e) { console.error('Error loading all events:', e) };
  }

  updateCols(mqAlias: string) {
    const cols = this.layoutService.getNumGridCols(mqAlias);
    this.numCols = Math.min(this.maxCols, cols);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}