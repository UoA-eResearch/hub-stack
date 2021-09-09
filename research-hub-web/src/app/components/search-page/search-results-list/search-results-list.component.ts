import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent {
  @Input() loading = false;
  @Input() searchResults: SearchResults = null;

  constructor(
    public searchService: SearchService
  ) { }
}
