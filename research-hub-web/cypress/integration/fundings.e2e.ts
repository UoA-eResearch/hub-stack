import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Funding Pages', () => {
    beforeEach(() => {
        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetFundingBySlug')) {
                req.alias = 'gqlGetFundingBySlug';
                req.reply({ fixture: 'funding' });
            }
        });

        cy.visit('/internal-funding/hikina-kia-tutuki');

        cy.wait('@gqlGetFundingBySlug');
    });

    it('can visit a funding page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit a funding page and display its title', () => {
        cy.get('h1.content-title').should('have.text', ' Funding Title ');
    });

    it('can visit a funding page and display its subtitle', () => {
        cy.get('.content-summary').should('exist');
    });

    it('displays a call to action button', () => {
        cy.get('.standard-button > span').should('have.text', 'Test');
    });

    it('funding page displays purpose text', () => {
        cy.get('#funding-purpose ng-component.ng-star-inserted p .ng-star-inserted').should('exist');
    });

    it('funding page displays body text', () => {
        cy.get('#funding-body ng-component.ng-star-inserted p .ng-star-inserted').should('exist');
    });

    it('displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays funding application documents', () => {
        cy.get('.application-doc-container .application-doc').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('app-standard-card#you-might-be-interested-in').should('have.length', 1);
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
