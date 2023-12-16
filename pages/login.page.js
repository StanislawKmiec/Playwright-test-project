import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';

exports.LoginPage = class LoginPage {
  constructor(page, loginButtonLocator) {
    this.page = page;
    this.loginModalLocator = '#logInModalLabel';
    this.userNameLocator = '#loginusername';
    this.passwordLocator = '#loginpassword';
    this.signInLocator = "//button[contains(text(),'Log in')]";
    this.homePage = new HomePage(page);
  }

  async waitForLoginModalAndCheckVisibility() {
    await this.page.waitForSelector(this.loginModalLocator);
    const loginModal = await this.page.locator(this.loginModalLocator);
    return await loginModal.isVisible();
  }

  async closeLoginModal() {
    await this.page.getByLabel('Log in').getByLabel('Close').click();
    const hidden = await this.page
      .getByLabel('Log in')
      .getByLabel('Close')
      .isHidden();
    return await hidden;
  }

  async fillInLoginCredentials(username, password) {
    await this.page.locator(this.userNameLocator).fill(username);
    await this.page.locator(this.passwordLocator).fill(password);
    await this.page.locator(this.signInLocator).click();
    return this;
  }

  async clickLogIn() {
    await this.page.locator(this.signInLocator).click();
    await this.page.locator(this.signInLocator).click();
    return this;
  }

  async verifyLoggedUser() {
    return await this.homePage.page
      .locator(this.homePage.logoutButtonLocator)
      .textContent();
  }

  async verfiyNotLoggedUser() {
    return await this.homePage.page
      .locator(this.homePage.loginButtonLocator)
      .textContent();
  }

  async getAlertWindowText() {
    return new Promise(async (resolve) => {
      this.page.on('dialog', async (dialog) => {
        let alerDetails = {
          message: dialog.message(),
          type: dialog.type()
        };
        await dialog.accept();
        resolve(alerDetails);
      });
    });
  }
};
