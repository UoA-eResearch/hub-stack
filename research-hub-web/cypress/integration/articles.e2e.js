describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/first-article');
    });

    it('can visit an article and display its title', () => {
        cy.contains('First article');
    });

    it('can display a list of its keywords', () => {
        cy.get('#keywords').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    xit('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Test - Starkiller Base').click();
        cy.contains('Starkiller Base was a military base located on the ice planet of Ilum in the Unknown Regions');
    });
});
