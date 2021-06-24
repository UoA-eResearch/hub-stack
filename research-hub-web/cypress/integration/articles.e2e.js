describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/open-access');
    });

    it('can visit an article and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;
    });

    it('can visit an article and display its subtitle', () => {
       cy.expect('#article-container .content-summary').not.to.be.empty; 
    });

    it('article displays body text', () => {
        cy.expect('#article-container ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child').click();
        cy.expect('h2.featured-title').not.to.be.empty;
    });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Open Access Guidelines').should('exist');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations').should('exist');
    });

});
