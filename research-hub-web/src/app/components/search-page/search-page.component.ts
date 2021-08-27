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

  public queryParams: ParamMap;
  public searchResults;

  constructor(
    public searchBarService: SearchBarService,
    public searchService: SearchService,
    public location: Location,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.queryParams = params;
      }
    );

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

    this.searchService.search(searchQuery)
      .subscribe(results => {
        this.searchResults = results;
        console.log(results);
      });

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

  // Create the initial page list
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
  }

  public removeFilterById(filterId: string, filterType: FilterType) {
    if (filterType === FilterType.ResearchCategory) {
      if (this.categoryFilter.indexOf(filterId) !== -1) {
        this.categoryFilter = this.categoryFilter.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.ResearchActivity) {
      if (this.stageFilter.indexOf(filterId) !== -1) {
        this.stageFilter = this.stageFilter.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.Organisation) {      
      if (this.organisationFilter.indexOf(filterId) !== -1) {
        this.organisationFilter = this.organisationFilter.filter(filter => filter !== filterId);
      }      
    }
    this.updateSearchFilters() 
  }

  ngOnDestroy() {
    this.resultSub$.unsubscribe();
    this.categoryChangeSub.unsubscribe();
    this.stageChangeSub.unsubscribe();
    this.organisationChangeSub.unsubscribe();
    this.allCurrentPages = [];
  }
}
