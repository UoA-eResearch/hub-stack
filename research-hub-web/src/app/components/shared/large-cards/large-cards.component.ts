import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-large-cards',
  templateUrl: './large-cards.component.html',
  styleUrls: ['./large-cards.component.scss']
})
export class LargeCardsComponent implements OnInit {
  @Input() contentItem;
  @Input() hideImage? : Boolean;
  // public contentArray;

  constructor() { }

  ngOnInit() {
    if (this.contentItem.__typename == "SubHub") {
      this.contentItem['items'] = [... this.contentItem.internalPagesCollection.items, ... this.contentItem.externalPagesCollection.items];
    }

    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items.forEach(element => {
        delete element['banner'].url;
      });
    };

    // If card is displaying an Organizational Unit
    if (this.contentItem.items[0]?.__typename == 'OrgUnit') {
      this.contentItem.items.forEach(element => {
        element['title'] = element['name'];
        element['__typename'] = 'Unit'
      });
    }

    // If card is displaying an OfficialDocument
    if (this.contentItem.items[0]?.__typename == 'OfficialDocuments') {
      this.contentItem.items.forEach(element => {
        element['__typename'] = 'Document'
      });
    }
  }

}
