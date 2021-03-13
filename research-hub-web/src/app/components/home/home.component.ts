import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Contact Section
   */
  public title = "Contact";
  public description = "If you want to get in touch you can ring us, write to us or even visit us. We'd love to hear from you.";
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public email = "eresearch-support@auckland.ac.nz";
  public phone = "+64 9 373 7599 ext 82231";
  public building = "assets/images/cer-level5-20170905.svg";

  constructor() {
  }

  ngOnInit() {
  }
}
