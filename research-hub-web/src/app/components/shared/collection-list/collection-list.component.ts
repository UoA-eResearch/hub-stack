import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnChanges {
  public pageNumber;
  public loading: Boolean = false;
  public itemsPerPage = 10;

  @Input() collection;

  constructor() {  }

  ngOnChanges(changes: SimpleChanges) {
    try { this.collection = changes['collection'].currentValue; this.loading = false } catch {}
  }

  // Scrolling to top of page on page change
  scrollToTop() {
    if (document.querySelector('.main-content')) document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
