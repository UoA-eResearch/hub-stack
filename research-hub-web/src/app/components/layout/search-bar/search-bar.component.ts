import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { SearchFilters } from '@app/global/searchTypes';
import { SearchAutocompleteService } from '@services/search-autocomplete.service';
import { SearchService } from '@services/search.service';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBarContainer') searchBarContainer: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('filterContent') filterContent: ElementRef;

  public searchText: FormControl = new FormControl();
  public activeFilters: SearchFilters;
  public showMobileSearch = false;
  public isMobile = false;
  public showFilters = false;

  private autoCompleteTerms: string[] = [];
  public filteredTerms: Observable<string[]>;

  private subscriptions = new Subscription();

  constructor(
    public searchService: SearchService,
    public searchAutocompleteService: SearchAutocompleteService,
    private renderer: Renderer2,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.searchBarContainer.nativeElement
        && !this.searchBarContainer.nativeElement.contains(e.target)
        && e.target !== this.filterContent.nativeElement
        && !this.filterContent.nativeElement.contains(e.target)
      ) {
        this.showMobileSearch = false;
        this.showFilters = false;
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(this.searchService.searchFilters.subscribe(filters => this.activeFilters = filters));
    this.subscriptions.add(this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => this.showFilters = false));
    this.subscriptions.add(this.breakpointObserver.observe('(max-width: 1100px)').subscribe(isSmallScreen => this.isMobile = isSmallScreen.matches));
    
    // Search autocomplete initialisation
    this.subscriptions.add(this.searchAutocompleteService.allTitles$.subscribe({
      next: titles => {
        this.autoCompleteTerms = [
          ...this.searchAutocompleteService.getAutocompleteTerms(),
          ...titles.articleTitles,
          ...titles.caseStudyTitles,
          ...titles.equipmentTitles,
          ...titles.eventTitles,
          ...titles.fundingTitles,
          ...titles.serviceTitles,
          ...titles.softwareTitles,
          ...titles.subHubTitles
        ];
      },
      error: (error: Error) => {
        console.error(`Search autocomplete error. ${error}`);
      }
    }));

    // Create search autocomplete filtered terms based on the user input
    this.filteredTerms = this.searchText.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterAutocompleteTerms(value))
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public countActiveFilters(): number {
    return this.activeFilters.category.length
      + this.activeFilters.relatedOrgs.length
      + this.activeFilters.stage.length;
  }

  public toggleMobileSearch(): void {
    this.showMobileSearch = !this.showMobileSearch;
    this.showFilters = this.showMobileSearch;
    if (this.showMobileSearch) {
      this.focus();
    }
  }

  public search(): void {
    this.router.navigate(
      ['/search'],
      {
        queryParams: this.searchService.generateQueryParams(this.searchText.value, this.activeFilters)
      }
    );
  }

  public focus(): void {
    this.renderer.selectRootElement(this.searchBox.nativeElement).focus();
  }

  /**
   * Filters out the autocomplete terms to match a user's search text input.
   * 
   * The filtering process also handles lowercasing, removes leading and trailing white space, and removal of diacritics/accents, so that for example,
   * a user input of 'creme brulee' will match 'Crème Brulée' in the autocomplete list (and vice-versa).
   * Ref: https://stackoverflow.com/a/37511463/9803180
   * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
   * 
   * @param value - the user input search term
   * @returns string[] of filtered autocomplete terms that match the user input
   */
  private filterAutocompleteTerms(value: string): string[] {
    const filterValue = value.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return this.autoCompleteTerms.filter(
      term => term.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(filterValue)
    );
  }
}
