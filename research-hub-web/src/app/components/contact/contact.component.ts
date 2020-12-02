import {Component} from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public title: String = "Contact";
  public summary: String = "If you want to get in touch you can ring us, write to us or even visit us. We'd love to hear from you.";
  public coverImageUrl: String = 'url(assets/images/banner22.jpg)';
  
  constructor() {

  }
}
