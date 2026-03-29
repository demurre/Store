class ProfilePage {
  readonly profileBtn = "#profile";
  readonly usernameInput = "input#username";
  readonly emailInput = "input#email";
  readonly fileInput = "input[type='file']";
  readonly saveBtn = "#save-btn";
  readonly message = "#message";

  open(): void {
    cy.get(this.profileBtn).click();
  }

  setUsername(name: string): void {
    cy.get(this.usernameInput).clear().type(name);
  }

  setEmail(email: string): void {
    cy.get(this.emailInput).clear().type(email);
  }

  uploadImage(fixturePath: string): void {
    cy.get(this.fileInput).selectFile(`cypress/fixtures/${fixturePath}`, {
      force: true,
    });
  }

  save(): void {
    cy.get(this.saveBtn).click();
  }

  assertUpdateSuccess(): void {
    cy.get(this.message).contains(/Profile updated successfully/i);
  }

  assertImageUploadSuccess(): void {
    cy.get(this.message).contains(/Image uploaded successfully/i);
  }

  assertSidebarName(name: RegExp | string): void {
    cy.getDataTest("sidebar").contains(name);
  }
}

export const profilePage = new ProfilePage();
