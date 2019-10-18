describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=username-field]").as("usernameField");
    cy.get("[data-cy=submit-btn]").as("submitBtn");
  });

  it("renders", () => {
    cy.get("[data-cy=app]").should("exist");
  });

  describe("Search form", () => {
    it("has disabled submit button only when text field is empty", () => {
      cy.get("@usernameField").type("kyleoliveiro");
      cy.get("@submitBtn").should("not.have.attr", "disabled");
      cy.get("@usernameField").clear();
      cy.get("@submitBtn").should("have.attr", "disabled");
    });

    it("shows error message when searching for invalid Github username", () => {
      cy.get("@usernameField").type("some invalid username");
      cy.get("@submitBtn").click();
      cy.contains("Github user not found");
    });

    it("clears error message when text field value is changed", () => {
      cy.get("@usernameField").type("some invalid username");
      cy.get("@submitBtn").click();
      cy.contains("Github user not found");
      cy.get("@usernameField").type("s");
      cy.contains("Github user not found").not();
    });

    it("goes to user page when searching for a valid user", () => {
      cy.get("@usernameField").type("kyleoliveiro");
      cy.get("@submitBtn").click();
      cy.location("pathname").should("eq", "/view/kyleoliveiro");
    });
  });
});
