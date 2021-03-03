import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
} from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public allItemsByCategory$: Observable<any>;
  public allItemsByStage$: Observable<any>;
  public allItemsByOrganisation$: Observable<any>;
  public resultSub$: Subscription;
  public allPages$;
  public allCurrentPages = [];
  public allCurrentPagesUnsorted = [];
  public categoryFilter = [];
  public stageFilter = []
  public organisationFilter = [];
  public queries;
  public params;
  public sortType;
  public pageType;
  public eventId = 16; // the displayOrder of eventId defined in contentful


  constructor(
    public searchBarService: SearchBarService,
    private route: ActivatedRoute,
    public location: Location
    ) { }

  async ngOnInit() {
    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();
    this.allPages$ = this.searchBarService.getAllPages();
    this.route.snapshot.queryParamMap.get('researchCategories') != null ? this.categoryFilter = [...this.route.snapshot.queryParamMap.get('researchCategories').split(",")] : ''; 
    this.route.snapshot.queryParamMap.get('researchActivities') != null ? this.stageFilter = [...this.route.snapshot.queryParamMap.get('researchActivities').split(",")] : '';
    this.updateSearchFilters();
  }

  // Create the initial page lsit
  public async initialPages() {

    // If Event is selected
    if (this.categoryFilter.indexOf(this.eventId.toString()) !== -1) {
      this.searchBarService.getAllEvents().subscribe(data => {
        setTimeout(() => this.searchBarService.setTotalPages(data["items"].length), 500); // Add delay to work, can try fix it to work without delay
        setTimeout(() => this.searchBarService.setResults(data["items"]), 500) // Add delay to work, can try fix it to work without delay
        this.searchBarService.setCategory([]);
        this.searchBarService.setStage([]);
        this.searchBarService.setOrganisation([]);
        this.searchBarService.setSearchText('');
      });
    }

    this.resultSub$ = this.searchBarService.resultsChange.subscribe(data => {
      this.allCurrentPages = data;
    });
  }

  // Update search filters
  public updateSearchFilters() {
    this.searchBarService.setStage(this.stageFilter);
    this.searchBarService.setCategory(this.categoryFilter);
    this.searchBarService.setOrganisation(this.organisationFilter);

    this.searchBarService.createResultsList();
    this.initialPages();
  }

  // Update ordering method when user changes filter
  updateOrder() {
    switch(this.sortType) {
      case 'Alphabetical':
        this.sortAlphabetical();
        break;
      case 'Default':
        this.sortDefault();
        break;
    }
  }

  // Alphabetical sort
  sortAlphabetical() {
    this.allCurrentPagesUnsorted = this.allCurrentPages.map((x) => {return { ...x };});
    this.allCurrentPages= this.allCurrentPages.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })
  }

  // Content sort
  sortDefault() {
    this.allCurrentPages = this.allCurrentPagesUnsorted.map((x) => {return { ...x };});
  }

  ngOnDestroy() {
    this.resultSub$.unsubscribe();
  }
}
