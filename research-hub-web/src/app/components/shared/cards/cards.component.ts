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

    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items.forEach(element => {
        delete element['banner'].url;
      });
    };
  }
}
