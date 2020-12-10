import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() title;
  @Input() contentItem;

  constructor() { }

  async ngOnInit() {

    // If Related Contacts
    if (this.contentItem.items[0]?.__typename == 'Person') {
      console.log(this.contentItem.items[0]);
      this.contentItem.items[0]['title'] = this.contentItem.items[0].name;
      this.contentItem.items[0]['summary'] = this.contentItem.items[0].role;
    }
  }

}
