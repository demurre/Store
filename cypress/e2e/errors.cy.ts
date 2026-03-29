describe("Error page tests", () => {
  it("Shows error page on unknown route", () => {
    cy.visit("/123");
    cy.contains("Error");
  });
});
