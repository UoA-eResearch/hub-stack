import { hasOperationName } from "../utils/graphql-utils";

describe("ResearchHubs Software Pages", () => {
  beforeEach(() => {
    cy.intercept("POST", Cypress.env("graphql_server"), (req) => {
      if (hasOperationName(req, "GetSoftwareBySlug")) {
        req.alias = "gqlGetSoftwareBySlug";
        req.reply({ fixture: "software" });
      }
    });

    cy.visit(
      "/research-software-and-computing/research-software/matlab"
    );

    cy.wait("@gqlGetSoftwareBySlug");
  });

  it("can visit a software page and display the banner", () => {
    cy.get(".banner-container").should("be.visible");
  });

  it("can visit a software and display its title", () => {
    cy.get("h1.content-title")
      .should("exist")
      .and("have.text", " Software Title ");
  });

  it("can visit a software and display its subtitle", () => {
    cy.get("#software-container .content-summary").should("exist");
  });

  it("displays a call to action button", () => {
    cy.get(".standard-button > span").should("have.text", "Test");
  });

  it("displays a specifications table", () => {
    cy.get("#specifications-table").contains("Details").should("exist");
    cy.get("#specifications-table").contains("Description").should("exist");
  });

  it("software displays body text", () => {
    cy.get(
      "#software-body > ng-component > ngx-contentful-rich-text > ng-component > p > ngx-contentful-rich-text > ng-component"
    ).should("exist");
  });

  it("displays a list of related items", () => {
    cy.get("#you-might-be-interested-in > app-standard-card").should(
      "have.length",
      1
    );
  });

  it("displays a list of contacts", () => {
    cy.get("app-contact-card").should("have.length", 1);
  });

  it("displays a list of organisations", () => {
    cy.get("app-org-unit-card").should("have.length", 1);
  });

  it("displays a list of documents", () => {
    cy.get("app-document-card").should("have.length", 1);
  });
});
