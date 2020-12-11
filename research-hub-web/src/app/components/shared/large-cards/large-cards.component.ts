import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-large-cards',
  templateUrl: './large-cards.component.html',
  styleUrls: ['./large-cards.component.scss']
})
export class LargeCardsComponent implements OnInit {
  @Input() contentItem;
  @Input() hideImage? : Boolean;

  constructor() { }

  ngOnInit() {
    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items.forEach(element => {
        delete element['banner'].url;
      });
    };
  }

}
