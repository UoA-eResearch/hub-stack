import { SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  public pageNumber = 1;

  @Input() collection;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.collection = changes['collection'].currentValue;
  }

  // Scroll to top of the page when data is refreshed
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename) {
      case 'Article': return 'import_contacts';
      case 'Equipment': return 'build';
      case 'SubHub': return 'layers';
      case 'Service': return 'home_repair_services';
      case 'Event': return 'calendar_today';
      default: return 'article'
    }
  }
}