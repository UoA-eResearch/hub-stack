import { Component, OnInit, Input } from '@angular/core';

interface Collection {
  __typename: string;
  items: [Content]
}
interface Content {
  __typename: string;
  slug: string;
  title: string;
  ssoProtected: boolean;
  summary: string;
  icon: {
    title: string;
    description: string;
    url: string;
  }
}

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  @Input() collection: Collection;

  constructor() { }

  ngOnInit(): void { }

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
