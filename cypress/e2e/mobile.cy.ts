describe("Mobile nav tests", () => {
  context("Phone resolution", () => {
    beforeEach(() => {
      cy.viewport("samsung-s10");
      cy.visit("/");
      cy.get("#email").type("123@gmail.com");
      cy.get("#password").type("123123");
      cy.get("button").click();
    });

    it("Displays mobile menu on click", () => {
      cy.getDataTest("sidebar").should("not.be.visible");
      cy.get("#burger-btn").click();
      cy.getDataTest("sidebar").should("be.visible");
    });
  });
});
