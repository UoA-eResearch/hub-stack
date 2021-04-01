describe('ResearchHubs Equipment  Pages', () => {

    beforeEach(() => {
        cy.visit('equipment/operetta-high-content-imaging-system');
    });

    it('can visit an equipment and display its title', () => {
        cy.contains('Operetta High-Content Imaging System');
    });

    it('can visit an equipment and display its subtitle', () => {
        cy.contains('The Operetta is an automated microscope which enables you to study many features simultaneously in complex biological systems. This is known as High Content Screening as extensive data can be generated from the images the Operetta captures.');
    });

    it('equipment displays body text', () => {
        cy.contains('The School of Biological Sciences (SBS) hosts an Operetta high-content screening (HCS) system that can be used for imaging cells and samples in great detail from slides and multi-well plates. This is useful for assay development, genome-wide siRNA, compound screens and many other image-based applications. The Operetta system has associated analysis tools to generate statistically valid numerical data from the microscope images it captures.');
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
        cy.get('#you-might-be-interested-in').contains('FoS Shared Research Equipment (ShaRE)').click();
        cy.contains('ShaRE houses core research facilities within the Faculty of Science to help people access the key analytical equipment and expertise necessary to support quality research and teaching.');
    });
    
    // No document in equipment
    //
    // it('displays a list of documents', () => {
    //     cy.get('#documents').contains('IT Acceptable Use Policy').should('exist');
    // });
    
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').invoke('removeAttr', 'target').click();
    //     cy.contains('The Impact of Research');
    // });
    
    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('School of Biological Sciences').should('exist');
    });
    
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').children().invoke('removeAttr', 'target').contains('School of Biological Sciences').click();
    //     cy.contains("Our school offers state-of-the-art research and teaching across a range of subject areas within the field of biological sciences. Find out more below.");
    // });
});