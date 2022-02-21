import { Component, Input } from '@angular/core';
import { IntranetSearchResults } from '@app/global/searchTypes';

@Component({
  selector: 'app-intranet-search-results-list',
  templateUrl: './intranet-search-results-list.component.html',
  styleUrls: ['./intranet-search-results-list.component.scss', './../search-common.scss']
})
export class IntranetSearchResultsListComponent {
  @Input() loading = false;
  @Input() searchResults: IntranetSearchResults;

  constructor() { }
}