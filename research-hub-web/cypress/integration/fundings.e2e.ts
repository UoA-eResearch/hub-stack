import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Funding Pages', () => {
    beforeEach(() => {
        console.log(Cypress.env('graphql_server'));

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

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title span').should('exist');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').should('exist');
    });
});
