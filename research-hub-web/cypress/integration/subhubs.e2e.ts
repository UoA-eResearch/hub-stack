import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs SubHub Pages', () => {
    beforeEach(() => {
        console.log(Cypress.env('graphql_server'));

        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetSubHubBySlug')) {
                req.alias = 'gqlGetSubHubBySlug';
                req.reply({ fixture: 'subhub' });
            }
        });

        cy.visit('/subhub/research-impact');

        cy.wait('@gqlGetSubHubBySlug');
    });

    it('can visit a subhub page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit a subhub page and display its title', () => {
        cy.get('h1.content-title').should('have.text', ' Subhub Title ');
    });

    it('can visit a subhub page and display its subtitle', () => {
        cy.get('.content-summary').should('exist');
    });
    
    it('can visit a subhub page and display its Maori proverb', () => {
        cy.get('.maori-proverb').should('exist').and('have.text', ' Maori Proverb ');
    });

    it('subhub page displays body text', () => {
        cy.get('#subhub-body ng-component.ng-star-inserted p .ng-star-inserted').should('exist');
    });

    it('displays subhub children (internal pages) and external pages', () => {
      cy.get('#subhub-children').should('exist');
      cy.get('#subhub-children > app-standard-card').should('have.length', 2);
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
