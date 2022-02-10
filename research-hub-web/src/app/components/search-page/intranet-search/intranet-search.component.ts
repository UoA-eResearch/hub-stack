import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { SortOrder, IntranetSearchQuery, IntranetSearchResult, IntranetSearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { IntranetSearchService } from '@services/intranet-search.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-intranet-search',
  templateUrl: './intranet-search.component.html',
  styleUrls: ['./intranet-search.component.scss']
})
export class IntranetSearchComponent implements OnInit, OnDestroy {
  public feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public staffIntranet = "https://www.staff.auckland.ac.nz/";

  public searchResults: IntranetSearchResult[] = [];
  public totalResults: number;
  public searchText: string;
  public sortOrder: SortOrder;

  private resultsPerPage: number = 10;
  
  public loading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public searchService: SearchService,
    public intranetSearchService: IntranetSearchService,
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
          this.sortOrder = params.get('sort') as SortOrder || 'relevance';
          this.searchResults = [];
          this.totalResults = 0;
        }),
        switchMap(() => this.intranetSearch())
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
            return this.intranetSearch(this.resultsPerPage, this.searchResults.length / this.resultsPerPage + 1);
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

    return this.intranetSearchService.search(searchQuery);
  }

  scrollToTop() {
    document?.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
