describe("Legacy route redirects", () => {

    it('can visit an old-style content route and be redirected to right page', () => {
        cy.visit('/#/content/1');
        cy.contains("View Service"); // Button for view service should exist.
    });

    it('should redirect invalid content route to not found page', () => {
        cy.visit('/#/content/thisdoesntexist');
        cy.contains("Page Not Found");
    })
});