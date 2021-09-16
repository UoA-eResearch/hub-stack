describe('ResearchHubs Search Page', () => {
    beforeEach(() => {
        cy.visit('/search?q=');
    });

    it('search filters should exist', () => {
        cy.get('.sticky-bar').should('exist');
    });

    it('search order selector should exist', () => {
        cy.get('#order-picker').should('exist');
    });
});
