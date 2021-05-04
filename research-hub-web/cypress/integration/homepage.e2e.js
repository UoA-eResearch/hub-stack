/**
 * Tests the basic homepage components i.e. Search, Featured, Research Categories, Research Activities, Contact
 * 
 */
describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // not sure what use this is?
    // it('has title', () => {
    //     cy.contains('ResearchHub');
    // });

    // Only enable if featured items are enabled

    // fragile testing approach
    it('displays featured items (old way)', () => {
        cy.contains(`The thing you learn about learning is that there's always more to learn! Here are the highlights of what we are all learning together in the research community at the University of Auckland`);
    })

    // more resiliant approach
    it('displays featured articles (better way)', () => {
        cy.expect('h2.featured-title').not.to.be.empty;
        cy.expect('.featured-content app-cards mat-nav-list:first-child').not.to.be.empty;
    })


    it('displays research categories', () => {
        cy.contains(`Research Categories`);
    })

    it('displays research activities', () => {
        cy.contains(`Research Activities`);
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