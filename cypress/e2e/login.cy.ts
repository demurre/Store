describe("Login tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login success", () => {
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.getDataTest("shop-layout").should("exist");
  });

  it("Login failed", () => {
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("12312");
    cy.get("button").click();
    cy.get("span")
      .contains(/Invalid login credentials/i)
      .should("exist");
  });

  it("Logout", () => {
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.getDataTest("shop-layout").should("exist");
    cy.get("#logout-btn").click();
    cy.get("#login").should("exist");
  });
});
