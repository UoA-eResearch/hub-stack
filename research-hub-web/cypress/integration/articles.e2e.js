describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/first-article');
    });

    it('can visit an article and display its title', () => {
        cy.contains('First article');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Starkiller Base').click();
        cy.contains('Starkiller Base was a military base located on the ice planet of Ilum in the Unknown Regions');
    });
});
