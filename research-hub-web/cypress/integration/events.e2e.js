describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/orientation-and-welcome-events');
    });

    it('can visit an event and display its title', () => {
        cy.contains('Orientation and Welcome Events');
    });

    it('can visit an event and display its subtitle', () => {
        cy.contains('The Orientation and Welcome Events curriculum is a package of events that are designed to help welcome new staff to the University');
    });

    it('event displays body text', () => {
        cy.contains('The Orientation and Welcome Events curriculum is a package of events that are designed to help welcome new staff to the University.');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    // it('displays a list of related items', () => {
    //     cy.get('#you-might-be-interested-in').should('exist');
    // });

    // it('clicking a related item takes you to its page', () => {
    //     cy.get('#you-might-be-interested-in').contains('Data Carpentry').click();
    //     cy.contains('Data Carpentry workshops teach core skills for working with data effectively and reproducibly');
    // });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Organisational Development (OD)').should('exist');
    });

    // it('displays a list of documents', () => {
    //     cy.get('#documents').contains('Code of Conduct').should('exist');
    // });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Organisational Development (OD)').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Office of Research Strategy and Integrity').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});