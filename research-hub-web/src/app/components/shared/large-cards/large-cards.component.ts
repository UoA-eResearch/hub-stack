import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-large-cards',
  templateUrl: './large-cards.component.html',
  styleUrls: ['./large-cards.component.scss']
})
export class LargeCardsComponent implements OnInit {
  @Input() contentItem;
  @Input() hideImage? : Boolean;
  public contentArray;

  constructor() { }

  ngOnInit() {
    this.contentArray = [... this.contentItem.internalPagesCollection.items, ... this.contentItem.externalPagesCollection.items];
    // If you want to hide image when displayed
    if (this.hideImage) {
      this.contentItem.items.forEach(element => {
        delete element['banner'].url;
      });
    };
  }

}
