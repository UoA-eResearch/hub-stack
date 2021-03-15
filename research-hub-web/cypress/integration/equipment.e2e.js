describe('ResearchHubs Equipment  Pages', () => {

    beforeEach(() => {
        cy.visit('/equipment/epson-surecolor-p10070');
    });

    it('can visit an equipment and display its title', () => {
        cy.contains('Epson SureColor P10070');
    });

    it('can visit an equipment and display its subtitle', () => {
        cy.contains('The SureColor Production 10070 is a 111.8cm (44 inch) Large Format Printer ideal for fine art printing, photos, high resolution images.');
    });

    it('equipment displays body text', () => {
        cy.contains('Please take care with submitting your work. All files will be printed to these specifications alone - missed information may result in your file not being printed.');
    });

    it('equipment displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('equipment displays specifications table 2', () => {
        cy.get('#specifications-table2').contains('Details').should('exist');
        cy.get('#specifications-table2').contains('Description').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Digital Print Centre').click();
        cy.contains('The Creative Arts and Industries Print Centre is a unique large format print service available to students and staff across the whole University.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Vicki Ormond').should('exist');
    });
    
    // No document in equipment
    //
    // it('displays a list of documents', () => {
    //     cy.get('#documents').contains('IT Acceptable Use Policy').should('exist');
    // });
    
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
    //     cy.contains('The Impact of Research');
    // });

    // No Organisations in equipment
    // 
    // it('displays a list of organisations', () => {
    //     cy.get('#organisations').contains('Centre for eResearch').should('exist');
    // });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Office of Research Strategy and Integrity').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});