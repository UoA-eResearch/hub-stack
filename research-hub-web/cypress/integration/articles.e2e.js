describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/open-access');
    });

    it('can visit an article and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit an article and display its subtitle', () => {
        cy.get('#article-container .content-summary small').text().should('not.be.empty');
    });

    it('article displays body text', () => {
        cy.get('#article-container ng-component.ng-star-inserted p .ng-star-inserted').text().should('not.be.empty');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child .card-title').text().should('not.be.empty');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > h4 > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a list of documents', () => {
        cy.get('#documents mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });

});
