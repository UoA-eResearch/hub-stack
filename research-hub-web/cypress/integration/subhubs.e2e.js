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
        cy.get('#subhub-container ng-component.ng-star-inserted p .ng-star-inserted').text().should('not.be.empty');
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
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > h4 > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
     });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });

});