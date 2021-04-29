describe('ResearchHubs Article Pages', () => {

    beforeEach(() => {
        cy.visit('/article/open-access');
    });

    it('can visit an article and display its title', () => {
        cy.contains('Open Access');
    });

    it('can visit an article and display its subtitle', () => {
        cy.contains('Open Access brings increased visibility, usage and impact to researchers and institutions. It benefits researchers, institutions, nations and society as a whole.');
    });

    it('article displays body text', () => {
        cy.contains('Open access is making published research');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Creative Commons').click();
        cy.contains('Open Content');
    });

    // it('displays a list of contacts', () => {
    //     cy.get('#contacts').contains('Dharani Sontam').should('exist');
    // });

    it('displays a list of documents', () => {
        cy.get('#documents').contains('Open Access Guidelines').should('exist');
    });

    // Cypress doesn't support multi-tabs
    // 
    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('IT Acceptable Use Guidelines').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Libraries and Learning Services').should('exist');
    });

    // Cypress doesn't dupport multi-tab testing
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Centre for eResearch').click();
    //     cy.contains("The Office of Research Strategy and Integrity (ORSI) was established in 2018 to support the work of the Deputy Vice Chancellor Research and the University's Research Committee in: ");
    // });
});
