import { Component } from '@angular/core';
import { GetFeedbackLinkGQL } from '@app/graphql/schema';
import { format } from 'date-fns';
import { map } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public aucklandUniUrl = 'https://auckland.ac.nz';
  public aboutUrl = '/article/about';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';
  public privacyUrl = 'https://www.auckland.ac.nz/en/privacy.html';
  public accessibilityUrl = 'https://www.auckland.ac.nz/en/accessibility.html';
  public feedbackUrl = this.getFeedbackLinkGQL.fetch().pipe(
    map(result => result.data.homepageCollection?.items[0]?.feedbackLink)
  );

  constructor(
    private getFeedbackLinkGQL: GetFeedbackLinkGQL
  ) { }

  // Get year for footer copyright
  getYear() {
    return format(new Date(), 'yyyy');
  }

}
