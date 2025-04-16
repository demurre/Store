describe("Profile tests", () => {
  it("Change name", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#profile").click();
    cy.wait(2000).get("input#username").clear().type("test");
    cy.get("#save-btn").click();
    cy.get("#message").contains(/Profile updated successfully/i);
    cy.wait(2000).reload();
    cy.getDataTest("sidebar").contains(/test/i);
  });
});
