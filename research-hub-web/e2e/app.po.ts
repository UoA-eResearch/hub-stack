import { browser } from 'protractor';

export class ResearchHubPage {
  async navigateTo(url) {
    return await browser.driver.get(url);
  }
}
