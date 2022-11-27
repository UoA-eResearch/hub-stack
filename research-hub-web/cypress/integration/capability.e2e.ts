import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Capability Pages', () => {
  beforeEach(() => {
    cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
      console.log(req)
      if (hasOperationName(req, 'GetCapabilityBySlug')) {
        req.alias = 'gqlGetCapabilityBySlug';
        req.reply({ fixture: 'capability' });
      }
    });

    cy.visit('/capability/research-impact');

    cy.wait('@gqlGetCapabilityBySlug');
  });

  it('can visit a capability page and display the banner', () => {
    cy.get('.banner-container').should('be.visible');
  });

  it('can visit a capability and display its title', () => {
    cy.get('h1.content-title').should('exist').and('have.text', ' Research impact ');
  });

  it('can visit a capability and display its subtitle', () => {
    cy.get('#capability-container .content-summary').should('exist');
  });

  it('can visit a capability page and display its Maori proverb', () => {
    cy.get('.maori-proverb').should('exist').and('have.text', ' external capability offering ');
  });

  it('displays a call to action button', () => {
    cy.get('.standard-button-banner > span').should('have.text', 'Test label');
  });

  it('capability displays body text', () => {
    cy.get('#capability-body > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('exist');
  });

  it('displays a list of related items', () => {
    cy.get('#you-might-be-interested-in > app-standard-card').should('have.length', 1);
  });

  it('displays a list of contacts', () => {
    cy.get('app-contact-card').should('have.length', 1);
  });

  it('displays a list of organisations', () => {
    cy.get('app-org-unit-card').should('have.length', 1);
  });

  it('displays a list of documents', () => {
    cy.get('app-document-card').should('have.length', 2);
  });
});
