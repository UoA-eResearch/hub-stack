describe('ResearchHubs Static Routing', () => {

    it('can visit /about and load the About Page', () => {
        cy.visit('/about');
        cy.contains('Message from the Director');
    });

    it('can visit /articles and load a list of Articles', () => {
        cy.visit('/articles');
        cy.contains('Article Collection');
    });

    it('can visit /article/first-article and load the correct content item', () => {
        cy.visit('/article/first-article');
        cy.contains('Have a good day.');
    });

});

describe('ResearchHubs Dynamic SubHub Routing', () => {

    it('can visit /cer and load a SubHub', () => {
        cy.visit('/cer');
        cy.contains('Pages in this SubHub');
        cy.contains('CeR. A root level SubHub.');
    });

    it('can visit /cer/our-services/engagement/first-article and load an Article', () => {
        cy.visit('/cer/our-services/engagement/first-article');
        cy.contains('Have a good day.');
        cy.get('#article-container').should('exist')
    });

    it('is redirected to SSO when viewing a protected items dynamic route', () => {
        cy.visit('/cer/our-services/engagement/top-secret-article');
        cy.url().should('include', 'iam', 'saml');
    })

}); 