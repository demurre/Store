class SignUpPage {
  readonly emailInput = "#email";
  readonly passwordInput = "#password";
  readonly submitButton = "button";
  readonly signUpLink = "a";
  readonly errorSpan = "span";

  visit(): void {
    cy.visit("/");
    cy.get(this.signUpLink)
      .contains(/Don't have/i)
      .click();
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

  signUp(email: string, password: string): void {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
  }

  assertSignUpSuccess(): void {
    cy.getDataTest("shop-layout").should("exist");
  }

  assertSignUpError(
    message: RegExp | string = /User already registered/i,
  ): void {
    cy.get(this.errorSpan).contains(message).should("exist");
  }
}

export const signUpPage = new SignUpPage();
