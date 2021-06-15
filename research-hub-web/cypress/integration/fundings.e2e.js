describe('ResearchHubs Funding Pages', () => {

    beforeEach(() => {
        cy.visit('/funding/FRDF');
    });

    it('can visit a case study and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;
    });

    it('can visit a case study and display its subtitle', () => {
        cy.expect('app-case-study .content-summary').not.to.be.empty;
    });

    it('case study displays body text', () => {
        cy.expect('app-case-study ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').should('exist');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations').should('exist');
    });
});
