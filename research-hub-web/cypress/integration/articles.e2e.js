describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/planning-for-impact');
    });

    it('can visit an article and display its title', () => {
        cy.contains('Planning for Impact');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Communicating your Research').click();
        cy.contains('The impact of Research Communication goes further than just explaining it, it’s about building bridges between research and the public to create a mutual engagement.');
    });
});
