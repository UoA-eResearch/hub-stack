describe("ResearchHubs Search Page", () => {
  beforeEach(() => {
    cy.visit("/search?q=");
  });

  it("search filters should exist", () => {
    cy.get(".sticky-bar").should("exist");
  });

  it("search order selector should exist", () => {
    cy.get("#order-picker").should("exist");
  });

  it("search page breadcrumbs should exist", () => {
    cy.get("app-breadcrumbs").should("exist");
  });

  it("Floating up button should exist", () => {
    cy.get(".floating-button").should("exist");
  });

  it("First tab should be found and be labelled as ResearchHub", () => {
    cy.get(".mat-tab-label-content").first().contains("ResearchHub");
  });

  it("Last tab should be found and be labelled as Staff Intranet", () => {
    cy.get(".mat-tab-label-content").last().contains("Staff Intranet");
  });

  it("Staff Intranet tab should show lock icon", () => {
    cy.get(".mat-tab-label-content").last().contains("mat-icon", "lock");
  });

  it("Staff Intranet tab content should contain Sign In button", () => {
    cy.get(".mat-tab-label-content").last().contains("Staff Intranet")
    .click();

    cy.get("a.mat-raised-button").contains("Sign In");
  });
});
