import { ResearchHubPage } from './app.po';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

let page: ResearchHubPage;


/**
 * Tests the basic functionality of the ResearchHub, e.g. whether the home page
 * loads successfully. 
 */
describe('ResearchHub\'s Basic Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Visits the home page and checks it contains the heading 'Welcome to the ResearchHub'.
   */
  it('can display welcome message', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      expect(page.getWelcomeMessage()).toEqual('Welcome to the ResearchHub');
    });
  });

  /**
   * Visits the home page -> Clicks one of the 'Category' tiles -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('can browse by category', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      browser.driver.findElement(by.className('tile-text')).click().then(() => {
        browser.waitForAngular().then(() => {
          expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
        });
      });
    });
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
  it('can directly navigate to search results page', () => {
    page.navigateTo(browser.baseUrl + '/#/search').then(() => {
      expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
    });
  });

  /**
   * Navigates to the home page -> Types 'vm' in the home page search bar -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('displays search results after typing in homepage search bar', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('vm').then(() => {
        browser.waitForAngular().then(() => {
          expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
        });
      });
    });
  });

  /**
   * Visits the home page -> Types 'biblioinformatics' in the home page search bar -> Clicks the first search result
   * item -> Checks that its title = 'BiblioInformatics'.
   */
  it('displays correct search results that can be navigated to', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('biblioinformatics').then(() => {
        browser.waitForAngular().then(() => {
          browser.driver.findElement(by.css('.results-list .mat-list-item')).click().then(() => {
            browser.waitForAngular().then(() => {
              expect(browser.driver.findElement(by.css('h2')).getText()).toEqual('BiblioInformatics');
            });
          });
        });
      });
    });
  });

});

/**
 * Describes a series of tests of the ResearchHub's search result filters.
 */
describe('ResearchHub\'s Filter Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Directly navgiates to the search results page (which defaults to 'All Categories') -> Counts the number of results 
   * -> Clicks one of the 'Limit items by research activity' filters -> Checks the number of results has decreased.
   */
  it('limiting items by research activity reduces the number of results returned', () => {

    /**
     * These two variables store the number of results returned before and after filtering.
     */
    let initialResultCount : number, filteredResultCount: number;

    page.navigateTo(browser.baseUrl + '/#/search').then(() => {
      browser.waitForAngular().then(() => {
        browser.driver.findElement(by.className('search-results-text')).getText().then(result => initialResultCount = parseInt(result));
        browser.driver.findElement(by.css('.mat-slide-toggle-thumb')).click().then(() => {
          browser.waitForAngular().then(() => {
            browser.driver.findElement(by.className('search-results-text')).getText().then(result => {
              filteredResultCount = parseInt(result)
              expect(initialResultCount).toBeGreaterThan(filteredResultCount);
            });
          });
        });
      });
    });
  });

});


/**
 * Describes a series of tests of the ResearchHub' integrated services.
 */
describe('ResearchHub\'s Integrated Services', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Searches for the item 'research vm' using the home page search box -> Clicks the first result -> 
   * Clicks the 'Request' button -> checks for SSO page heading 'The University of Auckland'. 
   */
  it('clicking the \'Request\' button on the \'Research Virtual Machines\' page redirects to Single sign-on', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('research vm').then(() => {
        browser.waitForAngular().then(() => {
          browser.driver.findElement(by.css('.results-list .mat-list-item')).click().then(() => {
            browser.waitForAngular().then(() => {
              browser.driver.findElement(by.css('.mat-raised-button')).click().then(() => {
                browser.ignoreSynchronization = true; // Don't wait for Angular components to load as this is an external site
                browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('h1'))), 7000).then(() => {
                  browser.driver.takeScreenshot();
                  expect(browser.driver.findElement(by.css('h1')).getText()).toEqual('The University of Auckland');
                });
              });
            });
          });
        });
      });
    });
  });
});

/**
 * Describes a series of tests of the ResearchHub' Research Impact services.
 */
describe('ResearchHub\'s Research Impact Content', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Directly navigates to the Research Impact guide page and checks the presence of the title 'Research Impact Guide'.
   */
  it('can directly navigate to main guide page', () => {
    page.navigateTo(browser.baseUrl + '/#/researchimpact').then(() => {
      browser.waitForAngular().then(() => {
        browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.description h2'))), 9000).then(() => {
          expect(browser.driver.findElement(by.css('.description h2')).getText()).toEqual('Research Impact Guide');
        });
      });
    });
  });

  /**
   * Directly navigates to the Research Impact guide page and checks the presence of an iframe with YouTube set as its
   * src attribute.
   */
  it('can load an iframe with youtube as src attribute', () => {
    page.navigateTo(browser.baseUrl + '/#/researchimpact').then(() => {
      browser.waitForAngular().then(() => {
        browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.description iframe'))), 9000).then(() => {
          expect(browser.driver.findElement(by.css('.description iframe')).getAttribute('src')).toContain('youtube');
        });
      });
    });
  });

  /**
   * Directly navigates to the Research Impact guide page, clicks on the first sub-page (guideCategory) and checks that
   * its title is 'Planning for Impact'.
   */
  it('can correctly load a sub-page (guideCategory) item', () => {
    page.navigateTo(browser.baseUrl + '/#/researchimpact').then(() => {
      browser.waitForAngular().then(() => {
        browser.driver.findElement(by.css('mat-grid-list .browse-tile')).click().then(() => {
          browser.waitForAngular().then(() => {
            browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.description h1'))), 9000).then(() => {
              expect(browser.driver.findElement(by.css('.description h1')).getText()).toEqual('Planning for Impact');
            });
          });
        });
      });
    });
  });

  /**
   * Directly navigates to the Research Impact guide page, clicks on the first sub-page (guideCategory) and checks that
   * the final part of the breadcrumbs is 'Planning for Impact'.
   */
  it('can display the breadcrumbs correctly', () => {
    page.navigateTo(browser.baseUrl + '/#/researchimpact').then(() => {
      browser.waitForAngular().then(() => {
        browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('mat-grid-list .browse-tile:first-of-type'))), 9000).then(() => {
          browser.driver.findElement(by.css('mat-grid-list .browse-tile:first-of-type')).click().then(() => {
            browser.waitForAngular().then(() => {
              browser.driver.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.description a:nth-of-type(3)'))), 9000).then(() => {
                expect(browser.driver.findElement(by.css('.description a:nth-of-type(3)')).getText()).toEqual('Planning for Impact');
              });
            });
          });
        });
      });
    });
  });

});
