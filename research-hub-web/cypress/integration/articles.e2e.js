describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/planning-for-impact');
    });

    it('can visit an article and display its title', () => {
        cy.contains('Planning for Impact');
    });

    it('can visit an article and display its subtitle', () => {
        cy.contains('Tools and resources for maximising the potential to achieve impact');
    });

    it('article displays body text', () => {
        cy.contains('The following tools and resources that will help you plan your research to maximise the potential of achieving impact.');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Communicating your Research').click();
        cy.contains('The impact of Research Communication goes further than just explaining it, it’s about building bridges between research and the public to create a mutual engagement.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Research Impact').should('exist');
    });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Health Research Council – Research Impact Guidance').should('exist');
    });

    it('clicking on a documents takes you to the documents', () => {
        cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
        cy.contains('The Impact of Research');
    });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Office of Research Strategy and Integrity').should('exist');
    });

    // Need to test when a new tab is opened
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Office of Research Strategy and Integrity').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});