describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/the-battle-of-geonosis');
    });

    it('can visit an article and display its title', () => {
        cy.contains('The Battle of Geonosis');
    });

    it('can display a list of its keywords', () => {
        cy.get('#keywords').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    }); 

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Who are the Jedi?').click();
        cy.contains('A Jedi was a devotee to the ways of the Jedi Order, an ancient order of protectors united by their ability to harness the power of the Force.');
    });
});
