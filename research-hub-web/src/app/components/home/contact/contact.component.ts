import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() description: JSON;
  @Input() feedbackLink: string;
  @Input() email: string;
  
  public title = "Contact";

  constructor() {
    
  }
}
