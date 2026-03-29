class LoginPage {
  readonly emailInput = "#email";
  readonly passwordInput = "#password";
  readonly submitButton = "button";
  readonly errorSpan = "span";
  readonly loginSection = "#login";

  visit(): void {
    cy.visit("/");
  }

  enterEmail(email: string): void {
    cy.get(this.emailInput).clear().type(email);
  }

  enterPassword(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  submit(): void {
    cy.get(this.submitButton).click();
  }

  login(email: string, password: string): void {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
  }

  assertLoginSuccess(): void {
    cy.getDataTest("shop-layout").should("exist");
  }

  assertLoginError(
    message: RegExp | string = /Invalid login credentials/i,
  ): void {
    cy.get(this.errorSpan).contains(message).should("exist");
  }

  assertLoginPageVisible(): void {
    cy.get(this.loginSection).should("exist");
  }
}

export const loginPage = new LoginPage();
