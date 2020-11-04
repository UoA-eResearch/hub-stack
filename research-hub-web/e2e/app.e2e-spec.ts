import { ResearchHubPage } from './app.po';
import { browser, by, element, $, $$, ExpectedConditions, ElementFinder, ElementArrayFinder } from 'protractor';

let page: ResearchHubPage;
const TIMEOUT_PERIOD = 65000;

/**
 * Wrapper around the standard $() and $$() Protractor functions that add extra waits
 * required to make the tests work reliably in BrowserStack Automation.
 * @param search CSS element finder
 */
export let _$ = (search): ElementFinder => {
  browser.driver.wait(ExpectedConditions.visibilityOf($(search)), TIMEOUT_PERIOD);
  browser.waitForAngular();
  return $(search);
}

/**
 * Wrapper around the standard $() and $$() Protractor functions that add extra waits
 * required to make the tests work reliably in BrowserStack Automation.
 * @param search CSS element finder
 */
export let _$$ = (search): ElementArrayFinder => {
  browser.driver.wait(ExpectedConditions.visibilityOf($$(search).first()), TIMEOUT_PERIOD);
  browser.waitForAngular();
  return $$(search);
}

/**
 * Tests the basic functionality of the ResearchHub, e.g. whether the home page
 * loads successfully.
 */
describe('ResearchHub\'s Basic Functionality', () => {

  beforeEach(async () => {
    page = new ResearchHubPage();
    await page.navigateTo(browser.baseUrl);
  });

  /**
   * Visits the home page and checks it contains the heading 'Welcome to the ResearchHub'.
   */
  it('can display welcome message', async () => {
    expect(await _$('app-root h1').getText()).toEqual('Welcome to the ResearchHub');
  });

  /**
   * Visits the home page -> Clicks one of the 'Category' tiles -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('can browse by category', async () => {
    await _$$('.tile-text').first().click();
    const searchPageTitle = await _$('.search-results-title').getText();
    expect(searchPageTitle).toEqual('Results');
  });

});
