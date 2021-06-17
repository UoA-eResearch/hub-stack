describe('ResearchHubs Case Study Pages', () => {

  beforeEach(() => {
      cy.visit('/casestudy/test-case-study');
  });

  it('can visit a case study and display its title', () => {
      cy.expect('h1.content-title').not.to.be.empty;
  });

  it('can visit a case study and display its subtitle', () => {
      cy.expect('app-case-study .content-summary').not.to.be.empty;
  });

  it('case study displays body text', () => {
      cy.expect('app-case-study ng-component.ng-star-inserted').not.to.be.empty;
  });

  it('displays a list of related items', () => {
      cy.get('#you-might-be-interested-in').should('exist');
  });

  it('displays a list of contacts', () => {
      cy.expect('#contacts .card-title').not.to.be.empty;
  });

  it('displays a list of documents', () => {
      cy.expect('#documents .card-title').not.to.be.empty;
  });

});
