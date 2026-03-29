import { profilePage } from "../pages/ProfilePage";

const defaultEmail = "test_acc@example.com";
const defaultName = "test_acc";
const updatedEmail = "test_acc1@testmail.com";
const updatedName = "test_acc1";

describe("Profile tests", () => {
  beforeEach(() => {
    cy.login("test_acc@example.com", "t3stPass!");
    profilePage.open();
  });

  it("Change display name, email and avatar, then restore", () => {
    profilePage.uploadImage("thumbnail.png");
    profilePage.assertImageUploadSuccess();

    profilePage.setUsername(updatedName);
    profilePage.setEmail(updatedEmail);
    profilePage.save();
    profilePage.assertUpdateSuccess();
    profilePage.assertSidebarName(updatedName);

    profilePage.open();
    profilePage.setUsername(defaultName);
    profilePage.setEmail(defaultEmail);
    profilePage.save();
    profilePage.assertUpdateSuccess();
    profilePage.assertSidebarName(defaultName);
  });
});
