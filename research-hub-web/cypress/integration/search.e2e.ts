describe('ResearchHubs Search Page', () => {
    beforeEach(() => {
        cy.visit('/search?q=');
    });

    it('displays banner image', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('displays breadcrumbs', () => {
        cy.get('app-breadcrumbs').should('exist')
            .and('contain.text', 'Search');
    });

    it('displays number of results found', () => {
        cy.get('.result-total > span > b').should('exist');
    });

    it('search filters should exist', () => {
        cy.get('.sticky-bar').should('exist');
    });

    it('displays number of search filters applied', () => {
        cy.get('div.applied-filters > span > b').should('have.text', '0');

        cy.visit('/search?q=test&cat=7HtS5VQdP1nWr5SRTIOOrS');

        cy.get('div.applied-filters > span > b').should('have.text', '1');
    });

    it('search order selector should exist', () => {
        cy.get('#order-picker').should('exist');
    });

    it('displays search results list', () => {
        cy.get('#search-results > app-search-results-list').should('exist');
    });

    it('displays scroll to top button', () => {
        cy.get('.floating-button').should('be.visible');
    });
});
