import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  private _contentItem;

  @Input()
  set contentItem(value: any) {
    // Make a copy of the contentItem, so we can make changes to it without causing ChangedAfterCheckErrors.
    // Then, remove null items.
    this._contentItem = Object.assign({}, value);
    // Don't display content without a title or name.
    this._contentItem.items = this._contentItem.items?.filter(item => item && (item.title || item.name || item.maoriName));
  };

  get contentItem(): any {
    return this._contentItem;
  }

  @Input() title: string;
  @Input() hideImage?: boolean;
  @Input() flex: string;

  constructor() { }

}
