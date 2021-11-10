describe('ResearchHubs services Pages', () => {

    beforeEach(() => {
        cy.visit('/service/research-virtual-machines');
    });

    it('can visit an service and display its title', () => {
        cy.get('h1.content-title').should('not.be.empty');
    });

    it('can visit an service and display its subtitle', () => {
        cy.get('#service-container .content-summary').should('not.be.empty');
    });

    it('service displays body text', () => {
      cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('not.be.empty');
    });

    it('service displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
      cy.get('#you-might-be-interested-in>app-standard-card').first().click();
      cy.get('h1.content-title').should('not.be.empty');
  });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title span').should('not.be.empty');
    });

    it('displays a list of documents', () => {
        cy.get('#documents mat-nav-list:first-child a').should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').should('not.be.empty');
    });

});
