describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/open-access');
    });

    it('can visit an article and display its title', () => {
        cy.get('h1.content-title').should('not.be.empty');
    });

    it('can visit an article and display its subtitle', () => {
        cy.get('#article-container .content-summary small').should('not.be.empty');
    });

    it('article displays body text', () => {
        cy.get('.body-media-list > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('not.be.empty');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in>app-standard-card').should('not.have.length', 0);
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in>app-standard-card').first().click();
        cy.get('h1.content-title').should('not.be.empty');
    });

    it('displays a list of documents', () => {
        cy.get('#documents a').should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').should('not.be.empty');
    });

});
