describe('ResearchHubs Static Routing', () => {
    it('can visit /articles and load a list of Articles', () => {
        cy.visit('/articles');
        cy.contains('Article Collection');
    });

    it('can visit /article/first-article and load the correct content item', () => {
        cy.visit('/article/communicating-your-research');
        cy.contains('The impact of Research Communication goes further than just explaining it, it’s about building bridges between research and the public to create a mutual engagement.');
    });
});

describe('ResearchHubs Dynamic SubHub Routing', () => {
    it('can visit /research-impact and load a SubHub', () => {
        cy.visit('/research-impact');
        cy.contains('Research Impact');
        cy.contains('Impact is the contribution that research and creative practice make to society, the environment and the economy, and the benefits to individuals, whānau, communities, organisations, New Zealand and the world');
    });

    it('can visit /research-impact/support-for-impactful-research and load an Article', () => {
        cy.visit('/research-impact/support-for-impactful-research');
        cy.contains('Throughout the University there are a number of staff who can offer specialist support in different areas related to research impact. This page also includes research impact related training opportunities and events.');
        cy.get('#article-container').should('exist')
    });

    it('will update a content item\'s URL when it is visited from outside the SubHub', () => {
        cy.visit('/articles');
        cy.get('mat-nav-list > mat-card')
            .contains('Support for impactful research').click();
        cy.url().should('include', '/research-impact/');
    })
});