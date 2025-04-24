describe("Errors tests", () => {
  it("Wrong path", () => {
    cy.visit("/123");
    cy.get("body").should("be.visible");
    cy.contains("Error");
  });
});
