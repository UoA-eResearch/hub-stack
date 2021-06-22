/**
 * Tests the basic homepage components i.e. Search, Featured, Research Categories, Research Activities, Contact
 */
describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // Only enable if featured items are enabled
    it('displays featured articles', () => {
        cy.get('app-content-title h2').text().should('not.be.empty');
        cy.get('app-cards mat-nav-list:first-child h4 a').text().should('not.be.empty');
    })

    it('displays research categories', () => {
        cy.get('#research-categories h2').text().should('not.be.empty');
        cy.get('#research-categories mat-card').text().should('not.be.empty');
    })

    it('displays research activities', () => {
        cy.get('#research-activities h2').text().should('not.be.empty');
        cy.get('#research-activities .inner-panel h3').text().should('not.be.empty');
        cy.get('#research-activities .inner-panel p').text().should('not.be.empty');
    })

    it('displays contact section', () => {
        cy.get('#contacts h2').text().should('not.be.empty');
        cy.get('#contacts .feedback-container p').text().should('not.be.empty');
    })

    it('displays footer', () => {
        cy.get('.footer-content li:first-child a').text().should('not.be.empty');
    })
});