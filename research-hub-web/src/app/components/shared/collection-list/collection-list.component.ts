import { SimpleChanges } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  public pageNumber = this.searchBarService.getCurrentPage();

  @Input() collection;
  constructor(public searchBarService: SearchBarService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNumber = this.searchBarService.getCurrentPage();
    this.collection = changes['collection'].currentValue;
  }

  // Reset the search by setting currentPage to 1 and scrolling to top of page
  scrollToTop($event) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.searchBarService.setCurrentPage($event);
    this.searchBarService.createResultsList();
  }

  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename) {
      case 'article': return 'import_contacts';
      case 'Article': return 'import_contacts';
      case 'equipment': return 'build';
      case 'Equipment': return 'build';
      case 'subhub': return 'layers';
      case 'Subhub': return 'layers';
      case 'service': return 'home_repair_services';
      case 'Service': return 'home_repair_services';
      case 'event': return 'calendar_today';
      case 'Event': return 'calendar_today';
      default: return 'article'
    }
  }
}