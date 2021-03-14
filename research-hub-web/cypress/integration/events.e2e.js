describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/hacky-hour');
    });

    it('can visit an event and display its title', () => {
        cy.contains('Hacky Hour');
    });

    it('can visit an event and display its subtitle', () => {
        cy.contains('Hacky Hour is a shared space and place where students and researchers can congregate to work on their research problems related to code, data, or digital tools in a social environment.');
    });

    it('event displays body text', () => {
        cy.contains('Inspired by #ResBaz and initiatives at Melbourne Uni, we are building a community @ UoA to share skills and knowledge across disciplinary boundaries.');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Research Bazaar').click();
        cy.contains('The Research Bazaar is a short intensive festival and conference held annually where researchers come together to up-skill in next generation digital research tools and scholarship.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Sina Masoud-Ansari').should('exist');
    });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Copyright Materials Policy').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Centre for eResearch').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Office of Research Strategy and Integrity').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});