/**
 * Tests the basic functionality of the ResearchHub, e.g. whether the home page
 * loads successfully.
 */
describe('ResearchHubs Basic Functionality', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('page loads and has title', () => {
        cy.get('title').should('not.be.empty');
    });

    it('an image asset is displayed', () => {
        cy.get('[alt="hub-logo"]')
            .should('be.visible')
            .invoke('width')
            .should('be.greaterThan', 0);
    });

});
