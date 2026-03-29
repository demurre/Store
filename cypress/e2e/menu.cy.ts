import { menuPage } from "../pages/MenuPage";

describe("Menu tests", () => {
  beforeEach(() => {
    cy.login("test_acc@example.com", "t3stPass!");
  });

  it("Search returns matching product", () => {
    menuPage.search("Fjallraven");
    menuPage.assertProductFound(/Fjallraven/i);
  });

  it("Search returns not-found message for unknown query", () => {
    menuPage.search("123abc");
    menuPage.assertNoProductsFound();
  });

  it("Clicking a product opens its page", () => {
    menuPage.openFirstProduct();
    menuPage.assertProductPageOpen();
  });
});
