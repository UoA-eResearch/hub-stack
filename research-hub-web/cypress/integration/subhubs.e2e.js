describe('ResearchHubs SubHub Pages', () => {

    beforeEach(() => {
        cy.visit('/subhub/communication-and-productivity');
    });

    it('can visit an subhub and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit an subhub and display its subtitle', () => {
        cy.get('#subhub-container .content-summary small').text().should('not.be.empty');
    });

    it('subhub displays body text', () => {
      cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').text().should('not.be.empty');
    });

    it('displays subhub children', () => {
        cy.get('#subhub-children').should('exist');
    });

    it('clicking a subhub child takes you to its page', () => {
        cy.get('#subhub-children mat-nav-list:first-child').click();
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child .card-title').text().should('not.be.empty');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
     });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').text().should('not.be.empty');
    });

});
