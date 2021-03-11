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

    it('Displays featured items', () => {
        cy.contains(`The thing you learn about learning is that there's always more to learn! Here are the highlights of what we are all learning together in the research community at the University of Auckland`);
    })

    it('Displays research categories', () => {
        cy.contains(`The University of Auckland provides top-quality support to our research community. The ResearchHub is your gateway to research support at the University of Auckland. Here you can explore what's on offer by topic.`);
    })

    it('Displays research activities', () => {
        cy.contains(`The research lifecycle describes the research journey from project inception to completion. It highlights five project stages. Below you can explore what the University of Auckland provides to support you according to where you are in your research journey.`);
    })

    it('Displays research activities', () => {
        cy.contains(`We are developing the ResearchHub further and would be grateful for your feedback. This will give us pointers for user-led refinement and further development of the interface content displayed in the ResearchHub.`);
    })

    it('Displays footer', () => {
        cy.contains(`Copyright © 2021 Centre for eResearch`);
    })
});