import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() title;
  public _contentItem;
  @Input() contentItem;
  @Input() hideImage?: boolean;
  @Input() flex;

  constructor() { }

  async ngOnInit() {
    // Make a copy of the contentItem, so we can make changes to it without causing ChangedAfterCheckErrors.
    // Then, remove null items.
    this._contentItem = Object.assign({}, this.contentItem);
    // Don't display content without a title or name.
    this._contentItem.items = this._contentItem.items?.filter(item => item && (item.title || item.name || item.maoriName));
    // If you want to hide image when displayed
    if (this.hideImage) { this._contentItem.items.forEach(element => {
        try { delete element['banner'].url } catch {} });
    };
  }
}
