import { Component, Input } from '@angular/core';
import { Maybe } from '@app/graphql/schema';
import { Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() description: Document;
  @Input() feedbackLink: Maybe<string>;
  @Input() email: Maybe<string>;
  
  public title = "Contact";

  constructor() {
    
  }
}
