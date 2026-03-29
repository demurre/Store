class MobileNavPage {
  readonly burgerBtn = "#burger-btn";
  readonly sidebar = "sidebar";

  setViewport(device: Cypress.ViewportPreset = "samsung-s10"): void {
    cy.viewport(device);
  }

  openBurgerMenu(): void {
    cy.get(this.burgerBtn).click();
  }

  assertSidebarHidden(): void {
    cy.getDataTest(this.sidebar).should("not.be.visible");
  }

  assertSidebarVisible(): void {
    cy.getDataTest(this.sidebar).should("be.visible");
  }
}

export const mobileNavPage = new MobileNavPage();
