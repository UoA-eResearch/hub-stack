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
  public resultSub$: Subscription;
  public allCurrentPages = [];
  public allCurrentPagesUnsorted = [];
  public categoryFilter = this.searchBarService.getCategory();
  public stageFilter = this.searchBarService.getStage();
  public organisationFilter = this.searchBarService.getOrganisation();
  public sortType;


  constructor(
    public searchBarService: SearchBarService,
    public location: Location
    ) { }

  async ngOnInit() {
    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();
    this.searchBarService.createResultsList();
    this.initialPages();
  }

  // Create the initial page lsit
  public async initialPages() {

    // Updating results when searched
    this.resultSub$ = this.searchBarService.resultsChange.subscribe(data => {
      this.allCurrentPages = data.map((x) => {return { ...x };});
      this.allCurrentPagesUnsorted = data.map((x) => {return { ...x };});

      // Update ordering if preselected
      this.updateOrder();
    });
  }

  // Update search filters
  public updateSearchFilters() {
    this.searchBarService.setStage(this.stageFilter);
    this.searchBarService.setCategory(this.categoryFilter);
    this.searchBarService.setOrganisation(this.organisationFilter);
    this.searchBarService.setCurrentPage(1);
    this.searchBarService.createResultsList();
    this.initialPages();
  }

  // Update ordering method when user changes filter
  updateOrder() {
    switch(this.sortType) {
      case 'Alphabetical': this.sortAlphabetical(); break;
      case 'Default': this.sortDefault(); break;}}

  // Alphabetical sort
  sortAlphabetical() {
    this.allCurrentPages= this.allCurrentPages.sort(function(a, b) { return a.title.localeCompare(b.title) })}

  // Content sort
  sortDefault() {
    this.allCurrentPages = this.allCurrentPagesUnsorted.map((x) => {return { ...x }})}

  ngOnDestroy() { this.resultSub$.unsubscribe()}
}
