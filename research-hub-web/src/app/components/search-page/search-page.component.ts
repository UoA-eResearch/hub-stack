import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { SearchFilters, SearchQuery, SearchResult, SortOrder, ContentType, SearchResults, IntranetSearchQuery, IntranetSearchResult, IntranetSearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { ActivatedRoute } from '@angular/router';
import supportsWebP from 'supports-webp';
import { concatMap, filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { PageTitleService } from '@services/page-title.service';
import { IntranetSearchService } from '@services/intranet-search.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";

  public bannerImageUrl: string = 'https://images.ctfassets.net/vbuxn5csp0ik/dLNmMgxMJVJjdDATTpWZn/433ae5de80f78868c4fb37a256ed2801/1500_UoA_13Oct09_001.jpg';

  public searchResults: SearchResult[] = [];
  public totalResults: number;
  public searchText: string;
  public activeFilters: SearchFilters;
  public sortOrder: SortOrder;
  
  public loading: boolean = true;
  
  // Staff intranet search
  public intranetSearchResults: IntranetSearchResult[] = [];
  public intranetTotalResults: number;
  public intranetLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchService: SearchService,
    public intranetSearchService: IntranetSearchService,
    private route: ActivatedRoute,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    public pageTitleService: PageTitleService
  ) {
    this.detectWebP();
  }

  ngOnInit() {
    this.pageTitleService.title = 'Search Results';
    /**
     * this subscription reacts to changes to the search parameters, i.e. new searches
     */
    this.subscriptions.add(this.route.queryParamMap
      .pipe(
        tap(params => {
          this.searchText = params.get('q') || '';
          this.activeFilters = {
            category: params.getAll('cat'),
            stage: params.getAll('ra'),
            relatedOrgs: params.getAll('org')
          }
          this.sortOrder = params.get('sort') as SortOrder || 'relevance';
          this.searchResults = [];
          this.totalResults = 0;
        }),
        switchMap(() => this.search())
      ).subscribe(searchResults => {
        this.searchResults = searchResults.results;
        this.totalResults = searchResults.totalResults;
        this.loading = false;
      })
    );

    /**
     * this subscription implements infinite scrolling
     */
    this.subscriptions.add(this.scrollDispatcher.scrolled().pipe(
      map((event: CdkScrollable) => event.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 500)),
      throttleTime(200),
      concatMap(() => {
        return this.ngZone.run(() => {
          if (this.searchResults.length < this.totalResults) {
            return this.search(10, this.searchResults.length);
          } else {
            return EMPTY;
          }
        })
      })
    ).subscribe((results) => {
      if (results) {
        this.ngZone.run(() => {
          this.searchResults = this.searchResults.concat(results.results);
          this.intranetLoading = false;
        })
      }
    }))

    /**
     * this subscription implements infinite scrolling on intranet search results
     */
     this.subscriptions.add(this.scrollDispatcher.scrolled().pipe(
      map((event: CdkScrollable) => event.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 500)),
      throttleTime(200),
      concatMap(() => {
        return this.ngZone.run(() => {
          if (this.intranetSearchResults.length < this.intranetTotalResults) {
            return this.intranetSearch(10, this.intranetSearchResults.length);
          } else {
            return EMPTY;
          }
        })
      })
    ).subscribe((results) => {
      if (results) {
        this.ngZone.run(() => {
          this.intranetSearchResults = this.intranetSearchResults.concat(results.results);
          this.loading = false;
        })
      }
    }))
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.bannerImageUrl = supported ? this.bannerImageUrl  + '?w=1900&fm=webp' : this.bannerImageUrl + '?w=1900';
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
  private search(size: number = 10, from: number = 0): Observable<SearchResults> {
    this.loading = true;

    const contentTypes: ContentType[] = ['article', 'caseStudy', 'equipment', 'event', 'funding', 'service', 'software', 'subHub']

    const searchQuery: SearchQuery = {
      query: this.searchText,
      size: size,
      from: from,
      filters: this.activeFilters,
      sort: this.sortOrder,
      includeContentTypes: contentTypes
    };

    return this.searchService.search(searchQuery);
  }

  /**
   * Executes a search using the current search text, filters and sort order.
   *
   * @param size - The maximum amount of hits to be returned
   * @param page - The page number of the results to be returned
   * @returns an array observable
   *
   */
  private intranetSearch(size: number = 10, page: number = 1): Observable<IntranetSearchResults> {
    this.intranetLoading = true;

    const searchQuery: IntranetSearchQuery = {
      query: this.searchText,
      size: size,
      page: page,
      sort: this.sortOrder
    };

    return this.intranetSearchService.search(searchQuery);
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.tab.textLabel === "Staff Intranet" && tabChangeEvent.tab.isActive) {
      this.intranetSearch().subscribe(searchResults => {
        this.intranetSearchResults = searchResults.results;
        this.intranetTotalResults = searchResults.totalResults;
        this.intranetLoading = false;
      })
    }

    if (tabChangeEvent.tab.textLabel === "ResearchHub" && tabChangeEvent.tab.isActive) {
      console.log('tab switched to researchhub')
    }
}

  scrollToTop() {
    document?.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
