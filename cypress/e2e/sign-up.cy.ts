import { signUpPage } from "../pages/SignUpPage";
import {
  generateRandomEmail,
  generateRandomPassword,
} from "../support/helpers";

describe("Sign up tests", () => {
  beforeEach(() => {
    signUpPage.visit();
  });

  it("Sign up with random credentials succeeds", () => {
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    signUpPage.signUp(email, password);
    signUpPage.assertSignUpSuccess();
  });

  it("Sign up via custom command", () => {
    cy.signUpRandom().then(({ email, password }) => {
      cy.log(`Created user: ${email} / ${password}`);
    });
    signUpPage.assertSignUpSuccess();
  });

  it("Sign up fails with already-registered email", () => {
    signUpPage.signUp("test_acc@example.com", "t3stPass!");
    signUpPage.assertSignUpError(/User already registered/i);
  });
});
