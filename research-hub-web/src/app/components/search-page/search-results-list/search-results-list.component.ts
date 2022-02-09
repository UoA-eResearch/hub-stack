import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IntranetSearchResults, SearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent {
  @Input() loading = false;
  @Input() searchResults: SearchResults;

  constructor(
    public searchService: SearchService,
    private router: Router
  ) { }

  public navigate(contentType: string, slug: string) {
    this.router.navigate([contentType.toLowerCase() + '/' + slug]);
  }

  public search(id: string): void {
    this.router.navigate(
      ['/search'],
      {
        queryParams: this.searchService.generateQueryParams('', {category: [id], stage: [], relatedOrgs: []})
      }
    );
  }
}
