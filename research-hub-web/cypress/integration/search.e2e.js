describe('ResearchHubs Search Page from Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Search Bar exists on homepage', () => {
        cy.get('.initial-search-outer input').invoke('attr', 'data-placeholder').should('eq', 'Search');
    });

    /**
     * Disabled for search redesign
     */
    // it('entering in the search bar navigates to the search page', () => {
    //     cy.get('.initial-search-outer input').type('{enter}');
    //     cy.get('#search-filters').should('exist');
    // });

    it('displays search content', () => {
        cy.get('.initial-search-outer input').type('{enter}');
        cy.contains('Results');
    });

    it('displays number of results', () => {
        cy.get('.initial-search-outer input').type('vision');
        cy.get('.initial-search-outer input').type('{enter}');
        cy.contains('Results');
    });

    /**
     * Disabled for search redesign
     */
    // it('displays no results', () => {
    //     cy.get('.initial-search-outer input').type('fffffffff');
    //     cy.get('.initial-search-outer input').type('{enter}');
    //     cy.contains('Sorry, your search for "fffffffff"');
    // });

    /**
     * Disabled for search redesign
     */
    // it('clicking a research category navigates to the search page', () => {
    //     cy.get('#research-categories').contains('View Category').click();
    //     cy.get('mat-chip').contains('Clear All').should('exist');
    // });

});

describe('ResearchHubs Search Page', () => {
    beforeEach(() => {
        cy.visit('/search');
    });

    /**
     * Disabled for search redesign
     */
    // it('search filters should exist', () => {
    //     cy.get('#search-filters').should('exist');
    // });

    /**
     * Disabled for search redesign
     */
    // it('displays order by filtering', () => {
    //     cy.get('#filtering-options').should('exist');
    // });

    /**
     * Disabled for search redesign
     */
    // it('displays pagination', () => {
    //     cy.get('#pagination').should('exist');
    // });
})
