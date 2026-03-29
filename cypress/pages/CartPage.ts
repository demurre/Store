class CartPage {
  readonly cartIcon = "#cart";
  readonly cartBadge = "#cart span";
  readonly cartItem = "#cart-item";
  readonly increaseBtn = "#increase-btn";
  readonly decreaseBtn = "#decrease-btn";
  readonly itemCount = "#item-count";
  readonly removeBtn = "#remove-btn";
  readonly checkoutBtn = "#checkout-btn";
  readonly successBanner = "#success";
  readonly successBtn = "#success-btn";
  readonly addToCartBtn = "#add-to-cart";

  addToCart(): void {
    cy.get(this.addToCartBtn).click();
  }

  openCart(): void {
    cy.getDataTest("sidebar").find(this.cartIcon).click();
  }

  increaseItem(): void {
    cy.get(this.cartItem).find(this.increaseBtn).click();
  }

  decreaseItem(): void {
    cy.get(this.cartItem).find(this.decreaseBtn).click();
  }

  removeItem(): void {
    cy.get(this.cartItem).find(this.removeBtn).click();
  }

  checkout(): void {
    cy.get(this.checkoutBtn).click();
  }

  dismissSuccess(): void {
    cy.get(this.successBanner).find(this.successBtn).click();
  }

  assertBadgeCount(count: number): void {
    cy.get(this.cartIcon).find("span").contains(String(count));
  }

  assertCartItemExists(): void {
    cy.get(this.cartItem).should("exist");
  }

  assertCartItemGone(): void {
    cy.get(this.cartItem).should("not.exist");
  }

  assertItemCount(count: number): void {
    cy.get(this.cartItem).find(this.itemCount).contains(String(count));
  }

  assertOrderSuccess(): void {
    cy.get(this.successBanner).should("exist");
    cy.get(this.successBanner).contains(
      /Your order has been successfully placed!/i,
    );
  }
}

export const cartPage = new CartPage();
