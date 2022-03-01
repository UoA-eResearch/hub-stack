describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/orientation-and-welcome-events');
    });

    it('can visit an event and display its title', () => {
        cy.get('h1.content-title').should('not.be.empty');
    });

    it('can visit an event and display its subtitle', () => {
        cy.get('.content-summary').should('not.be.empty');
    });

    it('event displays body text', () => {
      cy.get('.body-media-list > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('not.be.empty');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title span').should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').should('not.be.empty');
    });

});
