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
  @Input() public showFilters = false;

  @ViewChild('searchBar') searchBar: ElementRef;
  @ViewChild('filterContent') filterContent: ElementRef;

  public searchText: string;
  public activeFilters: SearchFilters;

  private subscriptions = new Subscription();

  constructor(
    public searchService: SearchService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.searchBar.nativeElement
        && e.target !== this.filterContent.nativeElement
        && !this.searchBar.nativeElement.contains(e.target)
        && !this.filterContent.nativeElement.contains(e.target)) {
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
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public clearFilters(): void {
    this.activeFilters = {
      category: [],
      stage: [],
      relatedOrgs: []
    };
  }

  public countActiveFilters(): number {
    return this.activeFilters.category.length
      + this.activeFilters.relatedOrgs.length
      + this.activeFilters.stage.length;
  }

}
