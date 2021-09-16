describe('ResearchHubs Search Page', () => {
    beforeEach(() => {
        cy.visit('/search?q=');
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
