import { Component, Input } from '@angular/core';
import { Article, CaseStudy, Equipment, Event, Funding, Service, Software, SubHub } from '@app/graphql/schema';

export type PossibleContentItems
  = Article
  | SubHub
  | CaseStudy
  | Equipment
  | Event
  | Funding
  | Service
  | Software

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: [
    './standard-card.component.scss',
    '../cards-common.scss'
  ]
})
export class StandardCardComponent {
  @Input() contentItem: PossibleContentItems;
  @Input() isSubhubChild = false;

  constructor() { }
}
