describe('ResearchHubs Software Pages', () => {

    beforeEach(() => {
        cy.visit('/research-software-and-computing/store-sync-share/microsoft-onedrive');
    });

    it('can visit a software page and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a subtitle', () => {
        cy.get('#software-container .content-summary').text().should('not.be.empty');
    });

    it('displays body text', () => {
        cy.get('#software-container ng-component.ng-star-inserted p .ng-star-inserted').text().should('not.be.empty');
    });

    it('displays a specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > h4 > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });
});