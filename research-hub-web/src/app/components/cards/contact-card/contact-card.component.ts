import { Component, Input, OnInit } from '@angular/core';
import { Person } from '@app/graphql/schema';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: [
    './contact-card.component.scss',
    '../cards-common.scss'
  ]
})
export class ContactCardComponent {
  @Input() person: Person;

  constructor() { }

  public navigateTo(url: string) {
    location.href = url;
  }

}
