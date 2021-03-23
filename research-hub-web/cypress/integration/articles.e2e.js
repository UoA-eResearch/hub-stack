describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/choosing-data-storage');
    });

    it('can visit an article and display its title', () => {
        cy.contains('Choosing Data Storage');
    });

    it('can visit an article and display its subtitle', () => {
        cy.contains('The University of Auckland provides a range of data storage options for research data, based on researcher requirements. This quick guide helps you select the appropriate storage for your data.');
    });

    it('article displays body text', () => {
        cy.contains('The University of Auckland provides a range of data storage options for research data, based on researcher requirements. These include:');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('File store, sync and share').click();
        cy.contains('University staff, doctoral and postgraduate students have several options to choose from for syncing and sharing data');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Dharani Sontam').should('exist');
    });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('IT Acceptable Use Guidelines').should('exist');
    });

    // Cypress doesn't support multi-tabs
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('IT Acceptable Use Guidelines').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Centre for eResearch').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Centre for eResearch').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});