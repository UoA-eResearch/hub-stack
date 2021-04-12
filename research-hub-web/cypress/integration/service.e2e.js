describe('ResearchHubs services Pages', () => {

    beforeEach(() => {
        cy.visit('/service/research-virtual-machines');
    });

    it('can visit an service and display its title', () => {
        cy.contains('Research Virtual Machines');
    });

    it('can visit an service and display its subtitle', () => {
        cy.contains('Support for virtual machines for computationally intensive research across Windows and Linux operating systems, supporting interactive and long-running workflows.');
    });

    it('service displays body text', () => {
        cy.contains('Many researchers need specialised computing facilities other than their desktop or laptop computer, that support different operating systems, allow interactive use rather than relying on a typical high-performance computing batch scheduler, and run for extended periods of time.');
    });

    it('service displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Nectar Research Cloud').click();
        cy.contains('Nectar Cloud provides a self-service computing infrastructure giving you access to your data and applications at any time, and the ability to collaborate with others from your desktop in a fast and efficient way.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Jason He').should('exist');
    });
    
    it('displays a list of documents', () => {
        cy.get('#documents').contains('IT Acceptable Use Policy').should('exist');
    });
    
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