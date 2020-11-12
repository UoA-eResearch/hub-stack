import { browser } from 'protractor';

export class ResearchHubPage {
  navigateTo(url) {
    return browser.driver.get(url);
  }
}