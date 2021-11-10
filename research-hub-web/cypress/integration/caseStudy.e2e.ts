describe('ResearchHubs Case Study Pages', () => {

    beforeEach(() => {
        cy.visit('/casestudy/test-case-study');
    });

    it('can visit a case study and display its title', () => {
        cy.get('h1.content-title').should('not.be.empty');
    });

    it('can visit a case study and display its subtitle', () => {
        cy.get('#case-study-container .content-summary small').should('not.be.empty');
    });

    it('case study displays body text', () => {
        cy.get('#case-study-container ng-component.ng-star-inserted p .ng-star-inserted').should('not.be.empty');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in mat-nav-list:first-child .card-title').should('not.be.empty');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts .card-title span').should('not.be.empty');
    });

    it('displays a list of documents', () => {
        cy.get('#documents mat-nav-list:first-child a').should('not.be.empty');
    });

});
