describe("Cart tests", () => {
  it("Add to cart test", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#add-to-cart").click();
    cy.get("#cart").find("span").contains("1");
    cy.getDataTest("sidebar").find("#cart").click();
    cy.get("#cart-item").should("exist");
  });
  it("Increase, descease in cart test", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#add-to-cart").click();
    cy.get("#cart").get("span").contains("1");
    cy.getDataTest("sidebar").get("#cart").click();
    cy.get("#cart-item").should("exist");
    cy.get("#cart-item").find("#increase-btn").click();
    cy.get("#cart-item").find("#item-count").contains("2");
    cy.get("#cart-item").find("#decrease-btn").click();
    cy.get("#cart-item").find("#item-count").contains("1");
    cy.get("#cart-item").find("#decrease-btn").click();
    cy.get("#cart-item").should("not.exist");
  });
  it("Delete from cart test", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#add-to-cart").click();
    cy.get("#cart").find("span").contains("1");
    cy.getDataTest("sidebar").find("#cart").click();
    cy.get("#cart-item").should("exist");
    cy.get("#cart-item").find("#remove-btn").click();
    cy.get("#cart-item").should("not.exist");
  });
  it("Checkout", () => {
    cy.visit("/");
    cy.get("#email").type("123@gmail.com");
    cy.get("#password").type("123123");
    cy.get("button").click();
    cy.get("#add-to-cart").click();
    cy.get("#cart").find("span").contains("1");
    cy.getDataTest("sidebar").find("#cart").click();
    cy.get("#cart-item").should("exist");
    cy.get("#checkout-btn").click();
    cy.get("#success").should("exist");
    cy.get("#success").contains(/Your order has been successfully placed!/i);
    cy.get("#success").find("#success-btn").click();
    cy.getDataTest("menu-list").should("exist");
  });
});
