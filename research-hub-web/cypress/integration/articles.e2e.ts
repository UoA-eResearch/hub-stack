import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Article Pages', () => {
    beforeEach(() => {
        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetArticleBySlug')) {
                req.alias = 'gqlGetArticleBySlug';
                req.reply({ fixture: 'article' });
            }
        });

        cy.visit('/article/open-access');

        cy.wait('@gqlGetArticleBySlug');
    });

    it('can visit an article page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit an article and display its title', () => {
        cy.get('h1.content-title').should('exist').and('have.text', ' Article Title ');
    });

    it('can visit an article and display its subtitle', () => {
        cy.get('#article-container .content-summary').should('exist');
    });

    it('can visit a article page and display its Maori proverb', () => {
        cy.get('.maori-proverb').should('exist').and('have.text', ' Maori Proverb ');
    });

    it('displays a call to action button', () => {
        cy.get('.standard-button-banner > span').should('have.text', 'Test');
    });

    it('article displays body text', () => {
        cy.get('#article-body > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('exist');
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
