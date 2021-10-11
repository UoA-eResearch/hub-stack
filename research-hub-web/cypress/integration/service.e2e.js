describe('ResearchHubs services Pages', () => {

    beforeEach(() => {
        cy.visit('/service/research-virtual-machines');
    });

    it('can visit an service and display its title', () => {
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('can visit an service and display its subtitle', () => {
        cy.get('#service-container .content-summary').text().should('not.be.empty');
    });

    it('service displays body text', () => {
      cy.get('#bodyMediaList > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').text().should('not.be.empty');
    });

    it('service displays specifications table', () => {
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

    it('displays a list of documents', () => {
        cy.get('#documents mat-nav-list:first-child a').text().should('not.be.empty');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations mat-nav-list:first-child a').text().should('not.be.empty');
    });

});
