import { loginPage } from "../pages/LoginPage";

describe("Login tests", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("Login success", () => {
    loginPage.login("test_acc@example.com", "t3stPass!");
    loginPage.assertLoginSuccess();
  });

  it("Login failed – wrong password", () => {
    loginPage.login("test_acc@example.com", "12312");
    loginPage.assertLoginError(/Invalid login credentials/i);
  });

  it("Logout", () => {
    loginPage.login("test_acc@example.com", "t3stPass!");
    loginPage.assertLoginSuccess();
    cy.get("#logout-btn").click();
    loginPage.assertLoginPageVisible();
  });
});
