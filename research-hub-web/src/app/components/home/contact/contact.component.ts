import { Component, Input } from '@angular/core';
import { Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() description: Document;
  @Input() feedbackLink: string;
  @Input() email: string;
  
  public title = "Contact";

  constructor() {
    
  }
}
