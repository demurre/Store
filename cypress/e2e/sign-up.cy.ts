describe("Sign up tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a")
      .contains(/Don't have/i)
      .click();
  });

  it("Sign up test", () => {
    cy.get("#email").type("123123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.getDataTest("shop-layout").should("exist");
  });

  it("Sign up test error", () => {
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("span").contains(/User already registered/i);
  });
});
