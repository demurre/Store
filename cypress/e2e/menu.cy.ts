describe("Menu tests", () => {
  it("Search test", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#search-input").type("Fjallraven");
    cy.get("a")
      .find("#product-title")
      .contains(/Fjallraven/i)
      .should("exist");
  });
  it("Product page test", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.wait(3000).getDataTest("menu-list").contains("a").first().click();
    cy.get("#product-content").should("exist");
  });
});
