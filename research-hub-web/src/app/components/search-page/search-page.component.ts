import { Component, OnInit } from '@angular/core';
import { 
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
} from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { AppComponentService } from '@app/app.component.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public resultSub$: Subscription;
  public sortType = this.searchBarService.getSort();
  public allCurrentPages = [];
  public allCurrentPagesUnsorted = [];
  public categoryFilter = this.searchBarService.getCategory();
  public stageFilter = this.searchBarService.getStage();
  public organisationFilter = this.searchBarService.getOrganisation();
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";


  constructor(
    public searchBarService: SearchBarService,
    public appComponentService: AppComponentService,
    public location: Location
    ) { }

  async ngOnInit() {

    // Set Title
    this.appComponentService.setTitle('Search');

    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();

    // Set the eventId for filtering by Event
    this.allCategories$.subscribe(data => {
      data.items.forEach(element => {
        if (element.name == 'Events') this.searchBarService.setEventId(element.sys.id);
      });
    })
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();
    this.searchBarService.createResultsList();
    this.initialPages();
  }

  // Clear All Filters
  public clear () {
    this.categoryFilter = [];
    this.stageFilter = [];
    this.organisationFilter = [];
    this.searchBarService.setCategory([]);
    this.searchBarService.setStage([]);
    this.searchBarService.setOrganisation([]);
    this.searchBarService.createResultsList();
  }

  // Create the initial page lsit
  public async initialPages() {

    // Updating results when searched
    this.resultSub$ = this.searchBarService.resultsChange.subscribe(data => {
      this.allCurrentPages = data.map((x) => {return { ...x };});
      this.allCurrentPagesUnsorted = data.map((x) => {return { ...x };});
    });
  }

  // Update search filters
  public updateSearchFilters() {
    this.searchBarService.setSort(this.sortType);
    this.searchBarService.setStage(this.stageFilter);
    this.searchBarService.setCategory(this.categoryFilter);
    this.searchBarService.setOrganisation(this.organisationFilter);
    this.searchBarService.setCurrentPage(1);
    this.searchBarService.createResultsList();
    this.initialPages();
  }

  ngOnDestroy() { this.resultSub$.unsubscribe()}
}
