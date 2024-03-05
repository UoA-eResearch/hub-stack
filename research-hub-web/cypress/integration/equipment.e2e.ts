import { hasOperationName } from '../utils/graphql-utils';

describe('ResearchHubs Equipment Pages', () => {
    beforeEach(() => {
        cy.intercept('POST', Cypress.env('graphql_server'), (req) => {
            if (hasOperationName(req, 'GetEquipmentBySlug')) {
                req.alias = 'gqlGetEquipmentBySlug';
                req.reply({ fixture: 'equipment' });
            }
        });

        cy.visit('infrastructure/operetta-high-content-imaging-system');

        cy.wait('@gqlGetEquipmentBySlug');
    });

    it('can visit an equipment page and display the banner', () => {
        cy.get('.banner-container').should('be.visible');
    });

    it('can visit an equipment and display its title', () => {
        cy.get('h1.content-title').should('exist').and('have.text', ' Equipment Title ');
    });

    it('can visit an equipment and display its subtitle', () => {
        cy.get('#equipment-container .content-summary').should('exist');
    });

    it('displays a call to action button', () => {
        cy.get('.standard-button > span').should('have.text', 'Test');
    });

    it('equipment displays specifications table', () => {
        cy.get('#specifications-table').contains('Details').should('exist');
        cy.get('#specifications-table').contains('Description').should('exist');
    });

    it('equipment displays specifications table 2', () => {
        cy.get('#specifications-table2').contains('Details').should('exist');
        cy.get('#specifications-table2').contains('Description').should('exist');
    });

    it('equipment displays body text', () => {
        cy.get('#equipment-body > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component').should('exist');
    });

    it('displays a list of related items', () => {
        cy.get('#you-might-be-interested-in > app-standard-card').should('have.length', 1);
    });

    it('displays a list of contacts', () => {
        cy.get('app-contact-card').should('have.length', 1);
    });

    it('displays a list of organisations', () => {
        cy.get('app-org-unit-card').should('have.length', 1);
    });

    it('displays a list of documents', () => {
        cy.get('app-document-card').should('have.length', 1);
    });
});
