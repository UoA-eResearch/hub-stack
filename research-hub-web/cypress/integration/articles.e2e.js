describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/open-access');
    });

    it('can visit an article and display its title', () => {
        cy.expect('h1.content-title').not.to.be.empty;
    });

    it('can visit an article and display its subtitle', () => {
        cy.expect('app-articles .content-summary').not.to.be.empty;
    });

    it('article displays body text', () => {
        cy.expect('app-articles ng-component.ng-star-inserted').not.to.be.empty;
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Creative Commons').click();
        cy.expect('h2.featured-title').not.to.be.empty;
    });

    // it('displays a list of contacts', () => {
    //     cy.get('#contacts').contains('Dharani Sontam').should('exist');
    // });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Open Access Guidelines').should('exist');
    });

    // Cypress doesn't support multi-tabs
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('IT Acceptable Use Guidelines').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Libraries and Learning Services').should('exist');
    });

    it('clicking on an organisation takes you to the organisation', () => {
        cy.get('#organisations').contains('Te Tumu Herenga').click();
        cy.expect('#page-title').not.to.be.empty;
    });
});
