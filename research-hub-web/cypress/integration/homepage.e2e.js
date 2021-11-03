/**
 * Tests the basic homepage components i.e. Search, Featured, Research Categories, Research Activities, Contact
 */
describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('displays notification', () => {
        cy.get('app-notification').should('be.visible');
    })

    it('displays banner content', () => {
        cy.get('app-banner-image').should('be.visible');
    })

    // Only enable if featured items are enabled
    it('displays featured articles', () => {
        cy.get('app-featured').should('be.visible');
        cy.get('app-content-title h2').text().should('not.be.empty');
        cy.get('app-cards mat-nav-list:first-child a').text().should('not.be.empty');
    })

    it('displays contact section', () => {
        cy.get('app-contact').should('be.visible');
        cy.get('#contacts h2').text().should('not.be.empty');
        cy.get('#contacts .feedback-container span').text().should('not.be.empty');
    })

    it('displays footer', () => {
        cy.get('.footer-content li:first-child a').text().should('not.be.empty');
    })
});