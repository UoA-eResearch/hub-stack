describe('ResearchHubs Software Pages', () => {

    beforeEach(() => {
        cy.visit('/research-software-and-computing/store-sync-share/microsoft-onedrive');
    });

    it('can visit an software and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;    
    });

    it('can visit an software and display its subtitle', () => {
        cy.expect('app-software .content-summary').not.to.be.empty;
    });

    it('software displays body text', () => {
        cy.expect('app-software ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('software displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
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
        cy.get('#organisations').should('exist');
    });

});