describe("Menu tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("body").should("be.visible");
  });

  it("Search test", () => {
    cy.get("#search-input").type("Fjallraven");
    cy.get("a")
      .find("#product-title")
      .contains(/Fjallraven/i)
      .should("exist");
  });

  it("Search test", () => {
    cy.get("#search-input").type("123abc");
    cy.get("div").contains(/not found/i);
  });

  it("Product page test", () => {
    cy.wait(3000).getDataTest("menu-list").contains("a").first().click();
    cy.get("#product-content").should("exist");
  });
});
