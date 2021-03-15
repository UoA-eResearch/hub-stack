describe('ResearchHubs Events Pages', () => {

    beforeEach(() => {
        cy.visit('/event/writing-a-data-management-plan-workshop');
    });

    it('can visit an event and display its title', () => {
        cy.contains('Writing A Data Management Plan Workshop');
    });

    it('can visit an event and display its subtitle', () => {
        cy.contains('A two-hour guided session for the creation of your initial data management plan.');
    });

    it('event displays body text', () => {
        cy.contains('If you want to create a data management plan (DMP) and do not know where to start or what to include, the Centre for eResearch in conjunction with Libraries and Learning Services offer a two hour DMP workshop.');
    });

    it('event displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Guide to Managing Research Artifacts and Data').click();
        cy.contains('Research artifacts and data encompasses everything that is collected, observed or created for the purposes of analysis that underpins a research output (e.g. publication or creative work).');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Dharani Sontam').should('exist');
    });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Data Governance Policy').should('exist');
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