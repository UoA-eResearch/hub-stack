import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-large-cards',
  templateUrl: './large-cards.component.html',
  styleUrls: ['./large-cards.component.scss']
})
export class LargeCardsComponent implements OnInit {
  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
