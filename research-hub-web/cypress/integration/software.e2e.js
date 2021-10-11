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
      cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').text().should('not.be.empty');
    });

    it('displays a specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child mat-card-title > a').click();
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').text().should('not.be.empty');
    });
});
