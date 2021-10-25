import { Component, Input } from '@angular/core';
import { OfficialDocuments } from '@app/graphql/schema';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: [
    './document-card.component.scss',
    '../cards-common.scss'
  ]
})
export class DocumentCardComponent {
  @Input() document: OfficialDocuments;

  constructor() { }

  public navigateTo(url: string) {
    location.href = url;
  }
}