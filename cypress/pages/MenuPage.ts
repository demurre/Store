class MenuPage {
  readonly searchInput = "#search-input";
  readonly productTitle = "#product-title";
  readonly productContent = "#product-content";
  readonly menuList = "menu-list";

  search(query: string): void {
    cy.get(this.searchInput).clear().type(query);
  }

  openFirstProduct(): void {
    cy.getDataTest(this.menuList).contains("a").first().click();
  }

  assertProductFound(name: RegExp | string): void {
    cy.get("a").find(this.productTitle).contains(name).should("exist");
  }

  assertNoProductsFound(): void {
    cy.get("div").contains(/not found/i);
  }

  assertMenuVisible(): void {
    cy.getDataTest(this.menuList).should("exist");
  }

  assertProductPageOpen(): void {
    cy.get(this.productContent).should("exist");
  }
}

export const menuPage = new MenuPage();
