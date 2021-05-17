describe('ResearchHubs Static Routing', () => {
    it('can visit /search and load a list of Articles', () => {
        cy.visit('/search');
        cy.contains('Results');
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
        // SubHub should contain links to other pages, which includes a "View Page" button.
        cy.contains("button", "View").should("exist");
    });

    it('can visit /research-impact/support-for-impactful-research and load an Article', () => {
        cy.visit('/research-impact/support-for-impactful-research');
        cy.contains('Throughout the University there are a number of staff who can offer specialist support in different areas related to research impact. This page also includes research impact related training opportunities and events.');
        cy.get('#article-container').should('exist')
    });

    // it('can visit /research-software-and-computing/advanced-compute/research-virtual-machines and load a Service', () => {
    //     cy.visit('/research-software-and-computing/advanced-compute/research-virtual-machines');
    //     cy.contains("View Service");
    // })

    it('will update a content item\'s URL when it is visited from outside the SubHub', () => {
        cy.visit('/article/support-for-impactful-research');
        cy.url().should('include', '/research-impact/');
    })
});

describe("ResearchHubs legacy routing", () => {

    // it('can visit an old-style content route and be redirected to right page', () => {
    //     cy.visit('/#/content/1');
    //     cy.contains("View Service"); // Button for view service should exist.
    // });

    it('should redirect invalid content route to not found page', () => {
        cy.visit('/#/content/thisdoesntexist');
        cy.contains("Page Not Found");
    })
});