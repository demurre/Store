import { cartPage } from "../pages/CartPage";
import { menuPage } from "../pages/MenuPage";

describe("Cart tests", () => {
  beforeEach(() => {
    cy.login("test_acc@example.com", "t3stPass!");
    cartPage.addToCart();
  });

  it("Add to cart", () => {
    cartPage.assertBadgeCount(1);
    cartPage.openCart();
    cartPage.assertCartItemExists();
  });

  it("Increase and decrease quantity in cart", () => {
    cartPage.assertBadgeCount(1);
    cartPage.openCart();
    cartPage.assertCartItemExists();

    cartPage.increaseItem();
    cartPage.assertItemCount(2);

    cartPage.decreaseItem();
    cartPage.assertItemCount(1);

    cartPage.decreaseItem();
    cartPage.assertCartItemGone();
  });

  it("Delete item from cart", () => {
    cartPage.assertBadgeCount(1);
    cartPage.openCart();
    cartPage.assertCartItemExists();

    cartPage.removeItem();
    cartPage.assertCartItemGone();
  });

  it("Checkout", () => {
    cartPage.assertBadgeCount(1);
    cartPage.openCart();
    cartPage.assertCartItemExists();

    cartPage.checkout();
    cartPage.assertOrderSuccess();

    cartPage.dismissSuccess();
    menuPage.assertMenuVisible();
  });
});
