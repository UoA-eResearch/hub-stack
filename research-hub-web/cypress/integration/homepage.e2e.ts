describe('ResearchHubs Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('displays notification', () => {
        cy.get('app-notification').should('be.visible');
    })

    it('displays banner content', () => {
        cy.get('app-banner-image').should('be.visible');
    })

    it('displays the title', () => {
        cy.get('h1.page-title').should('exist');
    });

    it('displays featured items', () => {
        cy.get('app-featured').should('be.visible');
        cy.get('app-content-title h2').should('exist');
        cy.get('.featured app-featured app-standard-card').should('have.length.greaterThan', 0);;
    })

    it('displays contact section', () => {
        cy.get('#contacts').scrollIntoView().should('be.visible');
        cy.get('#contacts h2').should('exist');
        cy.get('#contacts .feedback-container').should('exist');
    })

    it('displays footer', () => {
        cy.get('.footer-content').should('exist');
        cy.get('.footer-content .logo-img-container').should('exist');
        cy.get('.footer-content .footer-links').should('exist');
    })
});
