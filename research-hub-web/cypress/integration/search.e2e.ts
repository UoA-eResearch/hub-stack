describe('ResearchHubs Search Page', () => {
  beforeEach(() => {
    cy.visit('/search?q=');
  });

  it('displays banner image', () => {
    cy.get('.banner-container').should('be.visible');
  });

  it('displays breadcrumbs', () => {
      cy.get('app-breadcrumbs').should('exist')
          .and('contain.text', 'Search');
  });

  it('search filters should exist', () => {
    cy.get('.sticky-bar').should('exist');
  });

  it('search order selector should exist', () => {
    cy.get('#order-picker').should('exist');
  });

  it('displays number of results found', () => {
    cy.get('.result-total > span > b').should('exist');
  });

  it('displays number of search filters applied', () => {
    cy.get('div.applied-filters > span > b').should('have.text', '0');

    cy.visit('/search?q=test&cat=7HtS5VQdP1nWr5SRTIOOrS');

    cy.get('div.applied-filters > span > b').should('have.text', '1');
  });

  it('displays search results list', () => {
    cy.get('#search-results > app-search-results-list').should('exist');
  });

  it('displays scroll to top button', () => {
    cy.get('.floating-button').should('be.visible');
  });

  it('First tab should be found and be labelled as ResearchHub', () => {
    cy.get('.mat-tab-label-content').first().contains('ResearchHub');
  });

  it('Last tab should be found and be labelled as Staff Intranet', () => {
    cy.get('.mat-tab-label-content').last().contains('Staff Intranet');
  });

  it('Staff Intranet tab should show lock icon', () => {
    cy.get('.mat-tab-label-content').last().contains('mat-icon', 'lock');
  });

  it('Staff Intranet tab content should contain Sign In button', () => {
    cy.get('.mat-tab-label-content').last().contains('Staff Intranet')
    .click();

    cy.get('a.mat-raised-button').contains('Sign In');
  });
});
