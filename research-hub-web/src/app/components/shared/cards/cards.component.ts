import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() title;
  public contentItem;
  @Input("contentItem") _inputContentItem;
  @Input() hideImage?: boolean;
  @Input() flex;

  constructor() { }

  async ngOnInit() {
    // Make a copy of the contentItem, so we can make changes to it without causing ChangedAfterCheckErrors.
    // Then, remove null items.
    this.contentItem = Object.assign({}, this._inputContentItem);
    this.contentItem.items = this.contentItem.items.filter(item => item);
    // If you want to hide image when displayed
    if (this.hideImage) { this.contentItem.items.forEach(element => {
        try { delete element['banner'].url } catch {} });
    };
  }
}
