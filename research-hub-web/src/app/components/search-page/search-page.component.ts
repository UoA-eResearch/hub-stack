import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
} from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { FilterType } from '@app/global/global-variables';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public resultSub$: Subscription;
  public sortType = this.searchBarService.getSort();
  public allCurrentPages = [];
  public categoryFilter = this.searchBarService.getCategory();
  public stageFilter = this.searchBarService.getStage();
  public organisationFilter = this.searchBarService.getOrganisation();
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";
  public filterTypes = FilterType;
  public categoryChangeSub;
  public stageChangeSub;
  public organisationChangeSub;

  constructor(
    public searchBarService: SearchBarService,
    public location: Location
    ) { }

  async ngOnInit() {
    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();

    this.categoryChangeSub = this.searchBarService.searchCategoryChange.subscribe(searchCategory => {
      this.categoryFilter = searchCategory;
    });

    this.stageChangeSub = this.searchBarService.searchStageChange.subscribe(searchStage => {
      this.stageFilter = searchStage;
    });

    this.organisationChangeSub = this.searchBarService.searchOrganisationChange.subscribe(searchOrganisation => {
      this.organisationFilter = searchOrganisation;
    });

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
    this.searchBarService.setContentType([]);
    this.searchBarService.createResultsList();
  }

  // Create the initial page lsit
  public async initialPages() {

    // Updating results when searched
    this.resultSub$ = this.searchBarService.resultsChange.subscribe(data => {
      this.allCurrentPages = data.map(x => ({ ...x }));
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

  public removeFilterById(filterId: string, filterType: FilterType) {
    let filter;
    if (filterType === FilterType.ResearchCategory) {
      filter = this.categoryFilter;
    }
    if (filterType === FilterType.ResearchActivity) {
      filter = this.stageFilter;
    }
    if (filterType === FilterType.Organisation) {
      filter = this.organisationFilter;
    }

    const index = filter.indexOf(filterId);
    if (index > -1) {
      filter.splice(index, 1);
    }

    this.updateSearchFilters();
  }

  ngOnDestroy() {
    this.resultSub$.unsubscribe();
    this.categoryChangeSub.unsubscribe();
    this.stageChangeSub.unsubscribe();
    this.organisationChangeSub.unsubscribe();
    this.allCurrentPages = [];
  }
}
