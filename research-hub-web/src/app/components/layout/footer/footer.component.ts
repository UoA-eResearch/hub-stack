import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public aboutUs = "https://www.eresearch.auckland.ac.nz/?_ga=2.69549080.943707055.1614124973-1995817083.1603163706#";

  public homeUrl = '/';
  public aucklandUniUrl = 'https://auckland.ac.nz';
  public eResearchUrl = 'http://eresearch.auckland.ac.nz';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';
  public privacyUrl = 'https://www.auckland.ac.nz/en/privacy.html';
  public accessibilityUrl = 'https://www.auckland.ac.nz/en/accessibility.html';

  constructor() { }

  // Get year for footer copyright
  getYear() {
    return format(new Date(), 'yyyy');
  }

}
