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
    document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename.toLowerCase()) {
      case 'article': return 'article';
      case 'equipment': return 'handyman';
      case 'subhub': return 'language';
      case 'service': return 'manage_accounts';
      case 'event': return 'event';
      case 'software': return 'code';
      case 'casestudy': return 'cases';
      case 'funding': return 'paid';
      default: return 'article'
    }
  }
}
