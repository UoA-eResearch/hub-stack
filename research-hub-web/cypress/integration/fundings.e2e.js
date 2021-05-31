describe('ResearchHubs Funding Pages', () => {

  beforeEach(() => {
      cy.visit('/funding/FRDF');
  });

  it('can visit a funding and display its title', () => {
      cy.contains('Faculty Research Development Fund');
  });

  it('can visit a funding and display its subtitle', () => {
      cy.contains('The Faculty Research Development Fund (FRDF)');
  });

  it('displays purpose text', () => {
    cy.contains('The main objective of');
});

  it('displays body text', () => {
      cy.contains('When thinking about the allocations of funds');
  });

  it('displays specifications table', () => {
      cy.get('#specifications-table').contains('Details').should('exist');
      cy.get('#specifications-table').contains('Description').should('exist');
  });

  it('displays a list of contacts', () => {
      cy.get('#contacts').should('exist');
  });

  it('displays a list of organisations', () => {
      cy.get('#organisations').should('exist');
  });
});
