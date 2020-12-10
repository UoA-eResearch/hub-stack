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
      console.log(this.contentItem.items[0]);
      this.contentItem.items[0]['title'] = this.contentItem.items[0].name;
      this.contentItem.items[0]['summary'] = this.contentItem.items[0].role;
    }

    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items[0]['banner'].url.splice(0, 1)
    };
  }
}
