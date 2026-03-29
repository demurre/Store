import { mobileNavPage } from "../pages/MobileNavPage";

describe("Mobile nav tests", () => {
  context("Phone resolution (Samsung S10)", () => {
    beforeEach(() => {
      mobileNavPage.setViewport("samsung-s10");
      cy.login("test_acc@example.com", "t3stPass!");
    });

    it("Sidebar hidden by default, shown after burger click", () => {
      mobileNavPage.assertSidebarHidden();
      mobileNavPage.openBurgerMenu();
      mobileNavPage.assertSidebarVisible();
    });
  });
});
