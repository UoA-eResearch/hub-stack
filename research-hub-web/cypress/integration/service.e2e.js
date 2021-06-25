describe('ResearchHubs services Pages', () => {

    beforeEach(() => {
        cy.visit('/service/research-virtual-machines');
    });

    it('can visit an service and display its title', () => {
        cy.contains('Research Virtual Machines');
    });

    it('can visit an service and display its subtitle', () => {
        cy.expect('#service-container .content-summary').not.to.be.empty;
    });

    it('service displays body text', () => {
        cy.expect('#service-container ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('service displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child').click();
        cy.expect('h2.featured-title').not.to.be.empty;
    });

    it('displays a list of contacts', () => {
        cy.expect('#contacts mat-card:first-child h4').not.to.be.empty;
    });
    
    it('displays a list of documents', () => {
        cy.expect('#documents mat-card:first-child h4').not.to.be.empty;
    });
    
    it('displays a list of organisations', () => {
        cy.expect('#organisations mat-card:first-child h4').not.to.be.empty;
    });

});