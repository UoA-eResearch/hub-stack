import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { SearchFilters, SearchQuery, SearchResult, SortOrder, ContentType, SearchResults, SearchContext } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchContext: SearchContext = SearchContext.ResearchHub;
  public searchResults: SearchResult[] = [];
  public totalResults: number;
  public searchText: string;
  public activeFilters: SearchFilters;
  public sortOrder: SortOrder;
  
  public loading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchService: SearchService,
    private route: ActivatedRoute,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
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
          this.loading = false;
        })
      }
    }))
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
