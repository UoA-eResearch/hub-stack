import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss']
})
export class SearchResultsListComponent implements OnInit, OnChanges {
  public pageNumber;
  public loading: Boolean = false;

  @Input() results;

  constructor() { }

  ngOnInit() {
    this.results ? this.loading = false : this.loading = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    try { 
      this.results = changes['results'].currentValue;
      this.loading = false;
    } catch(e) {
      console.debug(`Error: ${e}`)
    }
  }
}
