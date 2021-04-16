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
        cy.contains('Results');
    });

    it('displays number of results', () => {
        cy.get('input').type('vision');
        cy.get('input').type('{enter}');
        cy.contains('Results');
    });

    it('displays no results', () => {
        cy.get('input').type('fffffffff');
        cy.get('input').type('{enter}');
        cy.contains('Sorry, your search for "fffffffff" in All Categories, did not match anything on the ResearchHub.');
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