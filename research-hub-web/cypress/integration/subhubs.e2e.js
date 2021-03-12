describe('ResearchHubs SubHub Pages', () => {

    beforeEach(() => {
        cy.visit('/subhub/communication-and-productivity');
    });

    it('can visit an subhub and display its title', () => {
        cy.contains('Communication and Productivity');
    });

    it('can visit an subhub and display its subtitle', () => {
        cy.contains('The University of Auckland provides access to essential communication and productivity software for all staff and postgraduate students.');
    });

    it('subhub displays body text', () => {
        cy.contains('From Word to Wordpress, the University provides access to the tools you need for your day-to-day. Explore the software below, discover how to install software on your University computer from the self-service center, or get a licence for your home computer.');
    });

    it('displays subhub children', () => {
        cy.get('#subhub-children').should('exist');
    });

    it('clicking a subhub child takes you to its page', () => {
        cy.get('#subhub-children').contains('Skype for Business').click();
        cy.contains('Microsoft Skype for Business offers videoconferencing, instant messaging, voice calling, online collaboration, and document sharing.');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in').should('exist');
    });

    it('clicking a related item takes you to its page', () => {
        cy.get('#you-might-be-interested-in').contains('Software for your University Computer').click();
        cy.contains('Software Self-Service portals allow staff using a University-owned computers to quickly install applications the University already owns, without needing any additional permission or administrator access on your computer.');
    });

    it('displays a list of contacts', () => {
        cy.get('#contacts').contains('Staff Service Centre').should('exist');
    });

    // Need to test when a new tab is opened
    // 
    // it('displays a list of documents (SSO Protected)', () => {
    //     cy.get('#documents').contains('Or sign in with one of the following services').should('exist');
    // });

    // it('clicking on a documents takes you to the documents', () => {
    //     cy.get('#documents').contains('Health Research Council – Research Impact Guidance').click();
    //     cy.contains('The Impact of Research');
    // });

    it('displays a list of organisations', () => {
        cy.get('#organisations').contains('Connect').should('exist');
    });

    // Need to test when a new tab is opened
    // 
    // it('clicking on an organisation takes you to the organisation', () => {
    //     cy.get('#organisations').contains('Connect').click();
    //     cy.contains("Or sign in with one of the following services");
    // });
});