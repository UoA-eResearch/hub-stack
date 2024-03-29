describe('ResearchHubs Static Routing', () => {
  it('can visit /search and load a list of Articles', () => {
    cy.visit('/search');
    cy.contains('Results');
  });

  it('can visit /article/first-article and load the correct content item', () => {
    cy.visit('/article/communicating-your-research');
    cy.get('#article-container .content-summary small').should('exist');
  });
});

describe('ResearchHubs Dynamic SubHub Routing', () => {
  const subHub = '/he-korowai-matauranga'
  const childSubHub = '/how-to-understand-and-apply'

  it('can visit article Research Impact and load a SubHub', () => {
    cy.visit(subHub);
    cy.get('h1.content-title').should('exist');
    // SubHub should contain links to other pages (subhub child pages).
    cy.get('#subhub-children').should('exist');
    cy.get('app-standard-card').contains('How can Vision Mātauranga').click();
    // should be on a new page which should be a sub page of research impact
    cy.url().should('include', childSubHub);
  });

  it('can visit Support for Impactful Research and load an Article', () => {
    cy.visit(`${subHub}${childSubHub}`);
    cy.get('h1.content-title').should('exist');
    cy.get('#subhub-container .content-summary small').should('exist');
  });

  it('can visit Research Virtual Machines page and load a Service', () => {
    cy.visit('/research-software-and-computing/advanced-compute/research-virtual-machines');
    cy.get('#you-might-be-interested-in > app-standard-card').should('have.length.greaterThan', 0);
  })

  it('will update a content item\'s URL when it is visited from outside the SubHub', () => {
    cy.visit(`/subhub${childSubHub}`);
    cy.url().should('include', subHub);
  })
});

describe("ResearchHubs legacy routing", () => {

  it('can visit an old-style content route and be redirected to right page', () => {
    cy.visit('/#/content/1');
    cy.get('h1.content-title').should('exist');
  });

  it('should redirect invalid content route to not found page', () => {
    cy.visit('/#/content/thisdoesntexist');
    cy.contains("Page Not Found");
  })
});

describe("ResearchHubs SSO protected content", () => {

  it('visiting an SSO protected item redirects to SSO login page', () => {
    cy.visit('/article/contracts-and-clauses');
    cy.location('pathname').should('include', '/profile/SAML2/Redirect/SSO');
  });
});
