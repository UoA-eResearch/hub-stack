import { SimpleChanges } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  public pageNumber;

  @Input() collection;
  constructor(public searchBarService: SearchBarService) { }

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges) {
    this.collection = changes['collection'].currentValue;
  }

  // Scrolling to top of page on search
  scrollToTop($event) {
    this.pageNumber = $event;
    this.searchBarService.createResultsList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Reset pageNumber to 1 if results are out of bounds
  public resetPage($event) {
    this.pageNumber = $event;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename) {
      case 'article': return 'article';
      case 'Article': return 'article';
      case 'equipment': return 'handyman';
      case 'Equipment': return 'handyman';
      case 'subHub': return 'language';
      case 'Subhub': return 'language';
      case 'service': return 'manage_accounts';
      case 'Service': return 'manage_accounts';
      case 'event': return 'event';
      case 'Event': return 'event';
      case 'software': return 'code';
      case 'Software': return 'code';
      case 'caseStudy': return 'cases';
      case 'CaseStudy': return 'cases';
      default: return 'article'
    }
  }
}