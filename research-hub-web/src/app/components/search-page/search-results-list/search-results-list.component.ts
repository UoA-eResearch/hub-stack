import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent implements OnChanges {
  public pageNumber;

  @Input() results;

  ngOnChanges(changes: SimpleChanges) {
    try { 
      this.results = changes['results'].currentValue;
    } catch(e) {
      console.debug(`Error: ${e}`)
    }
  }
}
