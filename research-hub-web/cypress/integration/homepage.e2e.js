/**
 * Tests the basic homepage components i.e. Search, Featured, Research Categories, Research Activities, Contact
 * 
 */
describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // Only enable if featured items are enabled
    it('displays featured articles', () => {
        cy.expect('h2.featured-title').not.to.be.empty;
        cy.expect('.featured-content app-cards mat-nav-list:first-child').not.to.be.empty;
    })

    it('displays research categories', () => {
        cy.expect('#research-categories h2').not.to.be.empty;
        cy.expect('#research-categories mat-card').not.to.be.empty;
    })

    it('displays research activities', () => {
        cy.expect('#research-activities h2').not.to.be.empty;
        cy.expect('#research-activities .inner-panel h3').not.to.be.empty;
        cy.expect('#research-activities .inner-panel p').not.to.be.empty;
    })

    it('displays contact section', () => {
        cy.contains(`We are developing the ResearchHub further and would be grateful for your feedback. This will give us pointers for user-led refinement and further development of the interface content displayed in the ResearchHub.`);
    })

    it('displays footer', () => {
        cy.contains(`Centre for eResearch`);
    })

    // it('clicking Sign In takes you to SSO', () => {
    //     cy.get('#top-bar').contains('Sign In').click();
    //     cy.contains('Or sign in with one of the following services');
    // })
});