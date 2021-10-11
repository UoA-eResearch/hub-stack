describe('ResearchHubs Funding Pages', () => {

    beforeEach(() => {
        cy.visit('/funding/FRDF');
    });

    it('can visit a funding page and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit a funding page and display its subtitle', () => {
        cy.get('.content-summary').text().should('not.be.empty');
    });

    it('funding page displays body text', () => {
        cy.get('#funding-container ng-component.ng-star-inserted p .ng-star-inserted').text().should('not.be.empty');
    });

    it('displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').text().should('not.be.empty');
    });
});
