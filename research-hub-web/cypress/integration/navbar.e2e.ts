describe('ResearchHubs NavBar', () => {

  beforeEach(() => {
    cy.viewport(1400, 700);
    cy.visit('/');
  });

  it('displays the navbar first row', () => {
    cy.get('.main-navbar-row').should('be.visible');
  });

  it('The ResearchHub logo is displayed', () => {
    cy.get('a.hub-logo > span > img')
      .should('be.visible')
      .invoke('width')
      .should('be.greaterThan', 0);
  });

  it('displays search bar', () => {
    cy.get('app-search-bar').should('exist');
  });

  it('can click Search icon in search box and navigate to search page', () => {
    cy.get('.search-bar-inner button mat-icon').contains('search').click();

    cy.location('pathname').should('include', 'search');
  });

  it('can enter a search into the search box and are taken to search page', () => {
    cy.get('#search').type('unicorns{enter}');
    cy.get('#search').should('have.value', 'unicorns');
    cy.location('pathname').should('include', 'search');
  });

  it('can click search filters icon in search bar and displays filters', () => {
    cy.get('.search-filters-container').should('not.exist');

    cy.get('.search-bar-inner button mat-icon').contains('tune').click();

    cy.get('.search-filters-container').should('exist');
  });

  it('can click Categories in navbar and navigate to Categories page', () => {
    cy.get('.main-navbar-row a').contains('Categories').click();

    cy.location('pathname').should('include', 'categories');
  });

  it('can click Activities in navbar and navigate to Activities page', () => {
    cy.get('.main-navbar-row a').contains('Research stage').click();

    cy.location('pathname').should('include', 'stage');
  });

  it('can click Sign In in navbar and are taken to SSO login page', () => {
    cy.get('.main-navbar-row a').contains('Sign in').click();

    cy.location('pathname').should('include', '/profile/SAML2/Redirect/SSO');
  });
});
