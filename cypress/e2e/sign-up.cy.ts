describe("Sign up tests", () => {
  it.only("Sign up test", () => {
    cy.visit("/");
    cy.get("a")
      .contains(/Don't have/i)
      .click();
    cy.get("#email").type("12312@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.getDataTest("shop-layout").should("exist");
  });
  it("Sign up test error", () => {
    cy.visit("/");
    cy.get("a")
      .contains(/Don't have/i)
      .click();
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("span").contains(/User already registered/i);
  });
});
