import { browser, by, element } from 'protractor';

export class ResearchHubPage {
  navigateTo(url) {
    return browser.driver.get(url);
  }

  getWelcomeMessage() {
    return browser.driver.findElement(by.css('app-root h1')).getText();
  }
}
