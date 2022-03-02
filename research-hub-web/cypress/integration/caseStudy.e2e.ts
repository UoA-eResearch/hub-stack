import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Case Study Pages', () => {
    beforeEach(() => {
        console.log(Cypress.env('graphql_server'));

        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetCaseStudyBySlug')) {
                req.alias = 'gqlGetCaseStudyBySlug';
                req.reply({ fixture: 'casestudy' });
            }
        });

        cy.visit('/casestudy/research-project-funding-case-study');

        cy.wait('@gqlGetCaseStudyBySlug');
    });

    it('can visit a case study page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit a case study page and display its title', () => {
        cy.get('h1.content-title').should('have.text', ' Case Study Title ');
    });

    it('can visit a case study page and display its subtitle', () => {
        cy.get('.content-summary').should('exist');
    });
    
    it('can visit a case study page and display its Maori proverb', () => {
        cy.get('.maori-proverb').should('exist').and('have.text', ' Maori Proverb ');
    });

    it('case study page displays body text', () => {
        cy.get('#casestudy-body ng-component.ng-star-inserted p .ng-star-inserted').should('exist');
    });

    it('case study page displays references', () => {
        cy.get('#casestudy-references ng-component.ng-star-inserted p .ng-star-inserted').should('exist');
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
