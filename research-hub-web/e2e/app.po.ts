import { browser } from 'protractor';

export class ResearchHubPage {
  navigateTo(url) {
    const done = () => { };
    setTimeout(done, 10000);
    return browser.driver.get(url);
  }
}
