import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SearchFilters } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() public showFilters = false;

  public searchText: string;
  public activeFilters: SearchFilters;

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
