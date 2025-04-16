describe("Errors tests", () => {
  it("Wrong path", () => {
    cy.visit("/123");
    cy.contains("Error");
  });
});
