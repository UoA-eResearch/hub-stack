/**
 * Tests the basic homepage components i.e. Search, Featured, Research Categories, Research Activities, Contact
 * 
 */
describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('has title', () => {
        cy.contains('ResearchHub');
    });

    // Only enable if featured items are enabled
    //
    // it('displays featured items', () => {
    //     cy.contains(`The thing you learn about learning is that there's always more to learn! Here are the highlights of what we are all learning together in the research community at the University of Auckland`);
    // })

    it('displays research categories', () => {
        cy.contains(`Research Categories`);
    })

    it('displays research activities', () => {
        cy.contains(`Research Activities`);
    })

    it('displays contact section', () => {
        cy.contains(`We are developing the ResearchHub further`);
    })

    it('displays footer', () => {
        cy.contains(`Centre for eResearch`);
    })

    it('clicking Sign In takes you to SSO', () => {
        cy.get('#top-bar').contains('Sign In').click();
        cy.contains('Or sign in with one of the following services');
    })
});