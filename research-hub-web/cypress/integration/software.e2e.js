describe('ResearchHubs Software Pages', () => {

    beforeEach(() => {
        cy.visit('/software/microsoft-onedrive');
    });

    it('can visit an software and display its title', () => {
        cy.contains('Microsoft OneDrive');
    });

    it('can visit an software and display its subtitle', () => {
        cy.contains('Microsoft OneDrive is available to all staff and is the cloud-based location for your University files.');
    });

    it('software displays body text', () => {
        cy.contains('OneDrive allows you to store 1TB of files and access them from any internet-connected device. You can also easily collaborate with others in the University or externally. When you start at the University you will automatically be allocated your own personal OneDrive. OneDrive is tightly integrated with Office365, allowing an easier collaboration with multiple editors on the same document at once and works more naturally with Office365 than similar services like Dropbox and Google Drive.');
    });

    it('software displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Dropbox for Research').click();
        cy.contains('The University has a Dropbox subscription to provide researchers with unlimited cloud-based storage and desktop syncing for research and collaboration needs.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Staff Service Centre').should('exist');
    });

    // No Documents in any Software Page
    //
    // it('displays a list of documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').should('exist');
    // });
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Connect').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Office of Research Strategy and Integrity').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});