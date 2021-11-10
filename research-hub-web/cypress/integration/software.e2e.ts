describe('ResearchHubs Software Pages', () => {

  beforeEach(() => {
    cy.visit('/research-software-and-computing/store-sync-share/microsoft-onedrive');
  });

  it('can visit a software page and display its title', () => {
    cy.get('h1.content-title').should('not.be.empty');
  });

  it('displays a subtitle', () => {
    cy.get('#software-container .content-summary').should('not.be.empty');
  });

  it('displays body text', () => {
    cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('not.be.empty');
  });

  it('displays a specifications table', () => {
    cy.get('#specifications-table').contains('Details').should('exist');
    cy.get('#specifications-table').contains('Description').should('exist');
  });

  it('displays a list of related items', () => {
    cy.get('#you-might-be-interested-in').should('exist');
  });

  it('clicking a related item takes you to its page', () => {
    cy.get('#you-might-be-interested-in>app-standard-card').first().click();
    cy.get('h1.content-title').should('not.be.empty');
  });

  it('displays a list of contacts', () => {
    cy.get('#contacts .card-title span').should('not.be.empty');
  });

  it('displays a list of organisations', () => {
    cy.get('#organisations mat-nav-list:first-child a').should('not.be.empty');
  });
});
