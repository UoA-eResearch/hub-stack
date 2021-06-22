describe('ResearchHubs Equipment  Pages', () => {

    beforeEach(() => {
        cy.visit('equipment/operetta-high-content-imaging-system');
    });

    it('can visit an equipment and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit an equipment page and display its subtitle', () => {
        cy.get('.content-summary').text().should('not.be.empty');
    });

    it('equipment displays body text', () => {
        cy.get('#equipment-container ng-component.ng-star-inserted p .ng-star-inserted').text().should('not.be.empty');
    });

    it('equipment displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('equipment displays specifications table 2', () => {
        cy.get('#specifications-table2').contains('Details').should('exist');
        cy.get('#specifications-table2').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child .card-title').text().should('not.be.empty');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > h4 > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });

});