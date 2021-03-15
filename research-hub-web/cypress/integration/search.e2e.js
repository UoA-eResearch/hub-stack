describe('ResearchHubs Search Page', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Search Bar exists on homepage', () => {
        cy.get('input').should('exist');
    });

    it('Entering in the search bar navigates to the search page', () => {
        cy.get('input').type('{enter}');
        cy.get('#search-filters').should('exist');
    });

    it('Clicking a research category navigates to the search page', () => {
        cy.get('#research-categories').contains('View Category').click();
        cy.get('mat-chip').contains('Clear All').should('exist');
    });

    it('Clicking a research activity navigates to the search page', () => {
        cy.get('#research-activities').contains('Plan & Design').click();
        cy.get('mat-chip').contains('Plan & Design').should('exist');
        cy.get('mat-chip').contains('Clear All').should('exist');
    });
});