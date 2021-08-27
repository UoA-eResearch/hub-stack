import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { SearchFilters, SearchQuery, SearchResult, SortOrder, ContentType } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public sortType = this.searchBarService.getSort();
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";
  public filterTypes = FilterType;

  public queryParams: ParamMap;
  public searchResults: SearchResult[];
  public totalResults: number;
  public searchText: string;
  public activeFilters: SearchFilters;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchBarService: SearchBarService,
    public searchService: SearchService,
    public location: Location,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.subscriptions.add(this.route.queryParamMap.subscribe(params => {
      this.queryParams = params;
      this.search();
    }));

    this.subscriptions.add(this.searchService.totalResults.subscribe(total => {
      this.totalResults = total;
    }));

    this.subscriptions.add(this.searchService.searchText.subscribe(text => {
      this.searchText = text;
    })); 

    this.subscriptions.add(this.searchService.searchFilters.subscribe(filters => {
      this.activeFilters = filters;
      console.log(this.activeFilters)
    }));

    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();

  }

  // Clear All Filters
  public clearFilters() {
    this.activeFilters = {
      category: [],
      stage: [],
      relatedOrgs: []
    };

    this.searchService.setSearchFilters(this.activeFilters);

    // TODO: get new search results list
    //need to set the query params then execute the search
  }

  public search() {
    console.log("Searching..")

    const searchFilters: SearchFilters = {
      category: this.queryParams.getAll('cat'),
      stage: this.queryParams.getAll('ra'),
      relatedOrgs: this.queryParams.getAll('org')
    }

    const contentTypes : ContentType[] = ['Article', 'CaseStudy', 'Equipment', 'Event', 'Funding', 'Service', 'Software', 'SubHub']

    const searchQuery: SearchQuery = {
      query: (this.queryParams.get('q') || ''),
      size: 10,
      from: 0,
      filters: searchFilters,
      sort: (this.queryParams.get('sort') || 'relevance') as SortOrder,
      includeContentTypes: contentTypes
    };

    this.subscriptions.add(this.searchService.search(searchQuery)
      .subscribe(results => {
        this.searchResults = results;
      }));
  }

  // Update search filters
  public updateSearchFilters() {
    this.searchBarService.setSort(this.sortType);
    // this.searchBarService.setStage(this.stageFilter);
    // this.searchBarService.setCategory(this.categoryFilter);
    // this.searchBarService.setOrganisation(this.organisationFilter);
    this.searchBarService.setCurrentPage(1);
    this.searchBarService.createResultsList();
  }

  public removeFilterById(filterId: string, filterType: FilterType) {
    if (filterType === FilterType.ResearchCategory) {
      if (this.activeFilters.category.indexOf(filterId) !== -1) {
        this.activeFilters.category = this.activeFilters.category.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.ResearchActivity) {
      if (this.activeFilters.stage.indexOf(filterId) !== -1) {
        this.activeFilters.stage = this.activeFilters.stage.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.Organisation) {      
      if (this.activeFilters.relatedOrgs.indexOf(filterId) !== -1) {
        this.activeFilters.relatedOrgs = this.activeFilters.relatedOrgs.filter(filter => filter !== filterId);
      }      
    }
    this.searchService.setSearchFilters(this.activeFilters);

    // TODO: get new search results list
    //need to set the query params then execute the search
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
