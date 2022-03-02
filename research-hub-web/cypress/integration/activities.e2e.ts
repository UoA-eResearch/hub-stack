describe('ResearchHubs Activities Page', () => {

  beforeEach(() => {
      cy.visit('/activities');
  });

  it('displays the title', () => {
      cy.get('#research-activities h1').should('exist');
  });

  it('displays the subtitle', () => {
    cy.get('#research-activities p').should('exist');
  })

  it('displays the activities', () => {
    cy.get('.research-activity-container .research-activity-content').children()
      .should('have.length.greaterThan', 0);
  })

  it('can click an activity and are taken to the search page', () => {
    cy.get('.research-activity-container .research-activity-content').children().first().click();

    cy.location('pathname').should('include', 'search');
  })
});