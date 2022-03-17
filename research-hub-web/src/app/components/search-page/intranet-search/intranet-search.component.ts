import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, iif, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { SortOrder, IntranetSearchQuery, IntranetSearchResult, IntranetSearchResults, SearchFilters, SearchContext } from '@app/global/searchTypes';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { SearchService } from '@services/search.service';
import { LoginService } from '@uoa/auth';

@Component({
  selector: 'app-intranet-search',
  templateUrl: './intranet-search.component.html',
  styleUrls: ['./intranet-search.component.scss', './../search-common.scss']
})
export class IntranetSearchComponent implements OnInit, OnDestroy {
  public searchContext: SearchContext = SearchContext.StaffIntranet;
  public searchResults: IntranetSearchResult[] = [];
  public totalResults: number;
  public searchText: string;
  public activeFilters: SearchFilters;
  public sortOrder: SortOrder;
  public errorMessage: string;

  private resultsPerPage: number = 10;
  
  public loading: boolean = false;

  public loggedIn$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchService: SearchService,
    private route: ActivatedRoute,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    public loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loggedIn$ = this.loginService.loggedIn$;

    this.subscriptions.add(this.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.search();
      }
    }));

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
            return this.intranetSearch(this.resultsPerPage, this.searchResults.length / this.resultsPerPage + 1);
          } else {
            return EMPTY;
          }
        })
      })
    ).subscribe({ 
      next: (results) => {
        if (results) {
          this.ngZone.run(() => {
            this.searchResults = this.searchResults.concat(results.results);
            this.loading = false;
          })
        }
      },
      error: (error: Error) => {
        this.loading = false;
        console.error(error.message);
        this.errorMessage = error.message;
      }
    }))
  }

  search() {
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
        switchMap(() => 
          iif(() => (this.searchText.length > 0),
            this.intranetSearch(),
            EMPTY
          )
        )
      ).subscribe({
        next: searchResults => {
          this.searchResults = searchResults.results;
          this.totalResults = searchResults.totalResults;
          this.loading = false;
        },
        error: (error: Error) => {
          this.loading = false;
          console.error(error.message);
          this.errorMessage = error.message;
        }
      })
    );
  }

  /**
   * Executes a search of the staff intranet using the current search text and sort order.
   *
   * @param size - The maximum amount of hits to be returned
   * @param page - The page number of the results to be returned
   * @returns an array observable
   *
   */
  private intranetSearch(size: number = 10, page: number = 1): Observable<IntranetSearchResults> {
    this.loading = true;

    const searchQuery: IntranetSearchQuery = {
      query: this.searchText,
      size: size,
      page: page,
      sort: this.sortOrder
    };

    return this.searchService.searchIntranet(searchQuery);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
