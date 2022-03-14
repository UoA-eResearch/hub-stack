describe('ResearchHubs Categories Page', () => {

  beforeEach(() => {
      cy.visit('/categories');
  });

  it('displays the title', () => {
      cy.get('#research-categories h1').should('exist');
  });

  it('displays the subtitle', () => {
    cy.get('#research-categories p').should('exist');
  })

  it('displays the categories', () => {
    cy.get('#research-categories div mat-nav-list mat-card')
      .should('exist').and('have.length.greaterThan', 0);
  })

  it('can click a category and are taken to the search page', () => {
    cy.get('#research-categories div mat-nav-list').children().first().click();

    cy.location('pathname').should('include', 'search');
  })
});