import { ResearchHubPage } from './app.po';
import { browser, by, element, $, $$, ExpectedConditions, ElementFinder, ElementArrayFinder } from 'protractor';

let page: ResearchHubPage;
const TIMEOUT_PERIOD = 12000;

/**
 * Wrapper around the standard $() and $$() Protractor functions that add extra waits
 * required to make the tests work reliably in BrowserStack Automation.
 * 
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
 * 
 * @param search CSS element finder
 */
export let _$$ = (search): ElementArrayFinder => {
  browser.driver.wait(ExpectedConditions.visibilityOf($$(search).first()), TIMEOUT_PERIOD);
  browser.waitForAngular();
  return $$(search);
}

/**
 * Wrapper around the standard element.sendKeys() method that fixes sync issues causing
 * some keys to be dropped.
 * Bug reference: https://github.com/angular/protractor/issues/698
 * 
 * @param element The element the keys are being sent to
 * @param keys The string of keys to be sent to the element
 */
export let sendKeysSafely = (element: ElementFinder, keys: string) => {
  element.click().then(() => element.clear().then(() => {
    keys.split('').forEach(c => element.sendKeys(c));
  }));

  browser.driver.sleep(3000); // Allow 3 seconds after typing input
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

/**
 * Describes a series of tests of the ResearchHub's search functionality.
 */
describe('ResearchHub\'s Search Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Directly navigates to the search results page and checks the presence of the search results page title 'Results'.
   */
  it('can directly navigate to search results page', async () => {
    await page.navigateTo(browser.baseUrl + '/search');
    expect(await _$('.search-results-title').getText()).toEqual('Results');
  });

  /**
   * Navigates to the home page -> Types 'vm' in the home page search bar -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('displays search results after typing in homepage search bar', async () => {
    await page.navigateTo(browser.baseUrl);
    sendKeysSafely(await _$('app-search-bar input'), 'biblioinformatics');
    expect(await _$('.search-results-title').getText()).toEqual('Results');
  });

  /**
   * Visits the home page -> Types 'biblioinformatics' in the home page search bar -> Clicks the first search result
   * item -> Checks that its title = 'BiblioInformatics'.
   */
  it('displays correct search results that can be navigated to', async () => {
    await page.navigateTo(browser.baseUrl);
    sendKeysSafely(await _$('app-search-bar input'), 'biblioinformatics');

    await _$$('.results-list .mat-list-item').first().click();
    expect(_$('h2').getText()).toEqual('BiblioInformatics');
  });

});

/**
 * Describes a series of tests of the ResearchHub's search result filters.
 */
describe('ResearchHub\'s Filter Functionality', () => {

  beforeEach(async () => {
    page = new ResearchHubPage();
    await page.navigateTo(browser.baseUrl + '/search');
  });

  /**
   * Directly navgiates to the search results page (which defaults to 'All Categories') -> Counts the number of results
   * -> Clicks one of the 'Limit items by research activity' filters -> Checks the number of results has decreased.
   */
  it('limiting items by research activity reduces the number of results returned', async () => {

    // These two variables store the number of results returned before and after filtering.
    let initialResultCount: number, filteredResultCount: number;

    await _$$('.search-results-text').first().getText().then(result => initialResultCount = parseInt(result));
    await _$$('.mat-slide-toggle-thumb').first().click();

    await _$$('.search-results-text').first().getText().then(result => {
      filteredResultCount = parseInt(result)
      expect(initialResultCount).toBeGreaterThan(filteredResultCount);
    });
  });

});

/**
 * Describes a series of tests of the ResearchHub' Research Impact services.
 */
describe('ResearchHub\'s Research Impact Content', () => {

  beforeEach(async () => {
    page = new ResearchHubPage();
    await page.navigateTo(browser.baseUrl + 'researchimpact');
  });

  /**
   * Directly navigates to the Research Impact guide page and checks the presence of the title 'Research Impact Guide'.
   */
  it('can directly navigate to main guide page', async () => {
    expect(await _$('.description h2').getText()).toEqual('Research Impact Guide');
  });

  /**
   * Directly navigates to the Research Impact guide page and checks the presence of an iframe with YouTube set as its
   * src attribute.
   */
  it('can load an iframe with youtube as src attribute', async () => {
    expect(await _$('.description iframe').getAttribute('src')).toContain('youtube');
  });

  /**
   * Directly navigates to the Research Impact guide page, clicks on the first sub-page (guideCategory) and checks that
   * its title is 'Planning for Impact'.
   */
  it('can correctly load a sub-page (guideCategory) item', async () => {
    await _$$('mat-grid-list .browse-tile').first().click();
    expect(await _$('.description h1').getText()).toEqual('Planning for Impact');
  });

  /**
   * Directly navigates to the Research Impact guide page, clicks on the first sub-page (guideCategory) and checks that
   * the final part of the breadcrumbs is 'Planning for Impact'.
   */
  it('can display the breadcrumbs correctly', async () => {
    await _$$('mat-grid-list .browse-tile').first().click();
    expect(await _$('.description a:nth-of-type(3)').getText()).toEqual('Planning for Impact')
  });

});