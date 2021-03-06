describe('ResearchHubs Static Routing', () => {
    it('can visit /search and load a list of Articles', () => {
        cy.visit('/search');
        cy.contains('Results');
    });

    it('can visit /article/first-article and load the correct content item', () => {
        cy.visit('/article/communicating-your-research');
        cy.get('#article-container .content-summary small').text().should('not.be.empty');
    });
});

describe('ResearchHubs Dynamic SubHub Routing', () => {
    it('can visit article Research Impact and load a SubHub', () => {
        cy.visit('/research-impact');
        cy.get('h1.content-title').text().should('not.be.empty');
        // SubHub should contain links to other pages, which includes a "View Page" button.
        cy.contains("button", "View").should("exist");
    });

    it('can visit Support for Impactful Research and load an Article', () => {
        cy.visit('/research-impact/support-for-impactful-research');
        cy.get('h1.content-title').text().should('not.be.empty');
        cy.get('#article-container .content-summary small').text().should('not.be.empty');
    });

    it('can visit Research Virtual Machines page and load a Service', () => {
        cy.visit('/research-software-and-computing/advanced-compute/research-virtual-machines');
        cy.expect('#you-might-be-interested-in .mat-nav-list:first-child a.card-title').not.to.be.empty;
    })

    it('will update a content item\'s URL when it is visited from outside the SubHub', () => {
        cy.visit('/article/support-for-impactful-research');
        cy.url().should('include', '/research-impact/');
    })
});

describe("ResearchHubs legacy routing", () => {

    it('can visit an old-style content route and be redirected to right page', () => {
        cy.visit('/#/content/1');
        cy.get('h1.content-title').text().should('not.be.empty');
    });

    it('should redirect invalid content route to not found page', () => {
        cy.visit('/#/content/thisdoesntexist');
        cy.contains("Page Not Found");
    })
});