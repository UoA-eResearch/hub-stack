describe('ResearchHubs SubHub Pages', () => {

    beforeEach(() => {
        cy.visit('/subhub/communication-and-productivity');
    });

    it('can visit an subhub and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;    });

    it('can visit an subhub and display its subtitle', () => {
        cy.expect('#subhub-container .content-summary').not.to.be.empty; 
    });
    it('subhub displays body text', () => {
        cy.expect('#subhub-container ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('displays subhub children', () => {
        cy.get('#subhub-children').should('exist');
    });

    it('clicking a subhub child takes you to its page', () => {
        cy.get('#subhub-children mat-nav-list:first-child').click();
        cy.expect('h2.featured-title').not.to.be.empty;
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child').click();
        cy.expect('h2.featured-title').not.to.be.empty;
    });

    it('displays a list of contacts', () => {
        cy.expect('#contacts .card-title').not.to.be.empty;
    });

    it('displays a list of organisations', () => {
        cy.expect('#organisations mat-card:first-child h4').not.to.be.empty;
    });

});