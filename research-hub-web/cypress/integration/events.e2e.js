describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/orientation-and-welcome-events');
    });

    it('can visit an event and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;
    });

    it('can visit an event and display its subtitle', () => {
        cy.expect('.content-summary').not.to.be.empty;
    });

    it('event displays body text', () => {
        cy.expect('#event-container p .ng-star-inserted').not.to.be.empty;
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Organisational Development (OD)').should('exist');
    });

    it('displays a list of organisations', () => {
        cy.expect('#organisations mat-card:first-child h4').not.to.be.empty;
    });

});
