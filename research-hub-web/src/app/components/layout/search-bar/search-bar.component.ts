import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchFilters, SearchQuery } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  public searchText: string;
  public activeFilters: SearchFilters;
  public showFilters = false;

  private subscriptions = new Subscription();

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.searchService.searchText.subscribe(text => this.searchText = text));
    this.subscriptions.add(this.searchService.searchFilters.subscribe(filters => this.activeFilters = filters));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public clearFilters(): void {
    this.activeFilters = null;
  }

  public countActiveFilters(): number {
    return !this.activeFilters
      ? 0
      : this.activeFilters.category?.length ?? 0
        + this.activeFilters.relatedOrgs?.length ?? 0
        + this.activeFilters.stage?.length ?? 0;
  }

}
