/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
import { generateRandomEmail, generateRandomPassword } from "./helpers";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select an element by its `data-test` attribute.
       * @example cy.getDataTest('sidebar')
       */
      getDataTest(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Log in via the UI and assert the shop layout is visible.
       * @example cy.login('user@example.com', 'secret')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Sign up with a freshly generated random e-mail + password.
       * Returns the credentials used so the test can reuse them.
       * @example cy.signUpRandom().then(({ email, password }) => { … })
       */
      signUpRandom(): Chainable<{ email: string; password: string }>;
    }
  }
}

Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("button").click();
  cy.getDataTest("shop-layout").should("exist");
});

Cypress.Commands.add("signUpRandom", () => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  cy.visit("/");
  cy.get("a")
    .contains(/Don't have/i)
    .click();
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("button").click();
  cy.getDataTest("shop-layout").should("exist");

  return cy.wrap({ email, password });
});

export {};
