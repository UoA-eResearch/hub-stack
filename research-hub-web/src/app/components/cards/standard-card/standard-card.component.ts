import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: [
    './standard-card.component.scss',
    '../cards-common.scss'
  ]
})
export class StandardCardComponent {
  @Input() contentItem: any;

  constructor() { }
}
