/**
 * Tests the basic functionality of the ResearchHub, e.g. whether the home page
 * loads successfully.
 */
describe('ResearchHubs Basic Functionality', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/');
    });

    it('has title', () => {
        cy.contains('Welcome to the ResearchHub');
    });

    it('can browse by category', () => {
        cy.contains('All Content').click();
        cy.contains('Browse all content available to you on the ResearchHub.');
    });
});

