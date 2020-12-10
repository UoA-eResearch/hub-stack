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
        delete element['banner'].url;
      });
    };
  }
}
