import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() title;
  @Input() contentItem;
  @Input() hideImage?: boolean;
  @Input() flex;

  constructor() { }

  async ngOnInit() {

    // If card is displaying a Person
    if (this.contentItem.items[0]?.__typename == 'Person') {
      this.contentItem.items.forEach(element => {
        element['title']= element['name'];
        element['summary'] = element['role'];
      });
    }

    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items.forEach(element => {
        try {
          delete element['banner'].url;
        } catch {}
      });
    };

    // If card is displaying an Organizational Unit
    if (this.contentItem.items[0]?.__typename == 'OrgUnit') {
      this.contentItem.items.forEach(element => {
        element['title']= element['name'];
      });
    }

  }
}
