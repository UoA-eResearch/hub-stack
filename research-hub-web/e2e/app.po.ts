import { browser, by, element } from 'protractor';

export class ResearchHubPage {
  async navigateTo(url) {
    return await browser.driver.get(url);
  }
}
