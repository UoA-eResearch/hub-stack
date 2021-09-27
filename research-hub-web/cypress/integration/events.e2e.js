describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/orientation-and-welcome-events');
    });

    it('can visit an event and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit an event and display its subtitle', () => {
        cy.get('.content-summary').text().should('not.be.empty');
    });

    it('event displays body text', () => {
      cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').text().should('not.be.empty');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child h4 a').text().should('not.be.empty');
    });

});
