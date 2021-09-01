import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SearchFilters } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBarContainer') searchBarContainer: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;

  public searchText: string;
  public activeFilters: SearchFilters;
  public showMobileSearch = false;
  public isMobile = false;
  public showFilters = false;

  private subscriptions = new Subscription();

  constructor(
    public searchService: SearchService,
    private renderer: Renderer2,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.searchBarContainer.nativeElement
        && !this.searchBarContainer.nativeElement.contains(e.target)
      ) {
        this.showFilters = false;
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(this.searchService.searchText.subscribe(text => this.searchText = text));
    this.subscriptions.add(this.searchService.searchFilters.subscribe(filters => this.activeFilters = filters));
    this.subscriptions.add(this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => this.showFilters = false));
    this.subscriptions.add(this.breakpointObserver.observe('(max-width: 960px)').subscribe(isSmallScreen => this.isMobile = isSmallScreen.matches));
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
    if (this.showFilters) {
      this.focus();
    }
  }

  public search(): void {
    if (this.isMobile) {
      this.toggleMobileSearch();
    }
    this.router.navigate(
      ['/search'],
      {
        queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters)
      }
    );
  }

  public focus(): void {
    this.renderer.selectRootElement(this.searchBox.nativeElement).focus();
  }

}
