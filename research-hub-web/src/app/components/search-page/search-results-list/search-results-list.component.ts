import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchResults } from '@app/global/searchTypes';

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent {
  @Input() loading = false;
  @Input() searchResults: SearchResults = null;

  @Output() searchCategory = new EventEmitter<string>();
}
