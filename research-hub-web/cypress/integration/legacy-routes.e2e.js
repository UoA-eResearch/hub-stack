describe("Legacy route redirects", () => {

    it('can visit an old-style content route and be redirected to right page', () => {
        cy.visit('/#/content/1');
        cy.contains("Research Virtual Machines");
    });
});