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

    it('can visit /Centre-for-eResearch and load a SubHub', () => {
        cy.visit('/Centre-for-eResearch ');
        cy.contains('Demo - Centre for eResearch');
        cy.contains('The Centre for eResearch is centrally funded by the University to deliver the services to help researchers address challenging computational problems. These services are generally free to use for research staff and students.');
    });

    it('can visit /our-services/engagement/first-article and load an Article', () => {
        cy.visit('/our-services/engagement/first-article');
        cy.contains('Have a good day.');
        cy.get('#article-container').should('exist')
    });

    it('will update a content item\'s URL when it is visited from outside the SubHub', () => {
        cy.visit('/articles');
        cy.get('mat-nav-list > mat-card')
            .contains('First article').click();
        cy.url().should('include', '/our-services/');
    })

}); 