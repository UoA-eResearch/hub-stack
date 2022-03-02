import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Events Pages', () => {
    beforeEach(() => {
        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetEventBySlug')) {
                req.alias = 'gqlGetEventBySlug';
                req.reply({ fixture: 'event' });
            }
        });

        cy.visit('/event/orientation-and-welcome-events');

        cy.wait('@gqlGetEventBySlug');
    });

    it('can visit an event page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit an event and display its title', () => {
        cy.get('h1.content-title').should('exist').and('have.text', ' Event Title ');
    });

    it('can visit an event and display its subtitle', () => {
        cy.get('#event-container .content-summary').should('exist');
    });

    it('displays a call to action button', () => {
        cy.get('.standard-button > span').should('have.text', 'Test');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('event displays body text', () => {
        cy.get('#event-body > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('exist');
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
        cy.get('app-document-card').should('have.length', 1);
    });
});
