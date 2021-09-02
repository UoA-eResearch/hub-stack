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
import { SearchFilters, SearchQuery, SearchResult, SortOrder, ContentType, SearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import supportsWebP from 'supports-webp';

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

  public bannerImageUrl: string = 'https://images.ctfassets.net/vbuxn5csp0ik/dLNmMgxMJVJjdDATTpWZn/433ae5de80f78868c4fb37a256ed2801/1500_UoA_13Oct09_001.jpg';
  public isMobile: Boolean;
  public supportsWebp: Boolean;

  public searchResults: SearchResult[] = [];
  public totalResults: number;
  public searchText: string;
  public activeFilters: SearchFilters;
  public searchResultsSub: Subscription;
  public sortOrder: SortOrder;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchBarService: SearchBarService,
    public searchService: SearchService,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    ) {
      this.detectDevice();
      this.detectWebP();
      this.router.onSameUrlNavigation ='reload';
    }

  ngOnInit() {
    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();
    
    this.subscriptions.add(this.route.queryParamMap.subscribe(params => {
      this.searchText = params.get('q') || '';
      this.activeFilters = {
        category: params.getAll('cat'),
        stage: params.getAll('ra'),
        relatedOrgs: params.getAll('org')
      }
      this.sortOrder = params.get('sort') as SortOrder || 'relevance';
    }));

    this.searchResultsSub = this.search().subscribe(results => {
      this.searchResults.push(...results.results);
      this.totalResults = results.totalResults;
    });
  }

  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  /**
   * Executes a search using the current search text, filters and sort order.
   *
   * @param size - The maximum amount of hits to be returned
   * @param from - The offset from the first result
   * @returns a SearchResults observable
   *
   */
  private search(size: number = 1000, from: number = 0) : Observable<SearchResults> {
    console.log("Searching..")

    const contentTypes : ContentType[] = ['article', 'caseStudy', 'equipment', 'event', 'funding', 'service', 'software', 'subHub']

    const searchQuery: SearchQuery = {
      query: this.searchText,
      size: size,
      from: from,
      filters: this.activeFilters,
      sort: this.sortOrder,
      includeContentTypes: contentTypes
    };

    console.log(searchQuery);

    return this.searchService.search(searchQuery);
  }  

  public clearFilters() {
    this.activeFilters = {
      category: [],
      stage: [],
      relatedOrgs: []
    };
    this.searchService.searchFilters.next(this.activeFilters);
    this.router.navigate(['search'], {queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder)});
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
    this.searchService.searchFilters.next(this.activeFilters);
    this.router.navigate(['search'], {queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder)});
  }

  public updateSortOrder() {
    this.router.navigate(['search'], {queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder)});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.searchResultsSub.unsubscribe();
  }
}
