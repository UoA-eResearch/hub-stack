describe('ResearchHubs Search Page from Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Search Bar exists on homepage', () => {
        cy.get('input').should('exist');
    });

    it('entering in the search bar navigates to the search page', () => {
        cy.get('input').type('{enter}');
        cy.get('#search-filters').should('exist');
    });

    it('displays search content', () => {
        cy.get('input').type('{enter}');
        cy.contains('Results found');
    });

    it('displays number of results found', () => {
        cy.get('input').type('ffffffffff');
        cy.get('input').type('{enter}');
        cy.contains('0 Results found');
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

describe('ResearchHubs Search Page', () => {
    beforeEach(() => {
        cy.visit('/search');
    });


    it('search filters should exist', () => {
        cy.get('#search-filters').should('exist');
    });

    it('displays order by filtering', () => {
        cy.get('#filtering-options').should('exist');
    });

    it('displays pagination', () => {
        cy.get('#pagination').should('exist');
    });
})