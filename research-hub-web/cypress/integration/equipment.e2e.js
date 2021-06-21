describe('ResearchHubs Equipment  Pages', () => {

    beforeEach(() => {
        cy.visit('equipment/operetta-high-content-imaging-system');
    });

    it('can visit an equipment and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;
    });

    it('can visit an equipment page and display its subtitle', () => {
        cy.expect('.content-summary').not.to.be.empty;
    });

    it('equipment displays body text', () => {
        cy.expect('#equipment-container p .ng-star-inserted').not.to.be.empty;
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
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in .mat-nav-list:first-child a.card-title').click();
        cy.expect('.banner-content h1').not.to.be.empty;
    });
    
    it('displays a list of organisations', () => {
        cy.expect('#organisations mat-card:first-child h4').not.to.be.empty;
    });
    
});