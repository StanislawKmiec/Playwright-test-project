import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';
import { correctLoginData, invalidLoginData1, invalidLoginData2} from '../test-data/login-credentials.data.js';
import { timeout } from '../playwright.config.js';

test.describe('Login tests to demoblaze store', () => {
  let login;
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    login = new LoginPage(page, home.loginModalLocator);
    await page.goto('/');
    await home.goToLoginModal();
  });

  test('Open login modal and check if it is visible', async ({ page }) => {
    expect(await login.waitForLoginModalAndCheckVisibility()).toBe(true);
  });

  test('Login with correct data', async ({ page }) => {
    await login.fillInLoginCredentials(correctLoginData.correctUserName, correctLoginData.correctPassword);
    const userLoggedIn = await login.verifyLoggedUser();
    
    expect (await userLoggedIn).toEqual('Log outt')
  });

  test.skip('Login with not existing username', async ({ page }) => {
    await login.fillInLoginCredentials(invalidLoginData1.wrongUserName, invalidLoginData1.wrongPassword);
    const alertDetails = await login.getAlertWindowText();
    const userNotLoggedIn = await login.verfiyNotLoggedUser();

    expect.soft (await userNotLoggedIn).toEqual('Log in')
    expect.soft(await alertDetails.type).toEqual('alert');
    expect.soft(await alertDetails.message).toEqual('User does not exist.');
  });

  test('Login with wrong password', async ({ page }) => {
    await login.fillInLoginCredentials(invalidLoginData2.correctUserName, invalidLoginData2.wrongPassword);
    const alertDetails = await login.getAlertWindowText();
    const userNotLoggedIn = await login.verfiyNotLoggedUser();
    
    expect.soft (await userNotLoggedIn).toEqual('Log in')
    expect.soft(await alertDetails.type).toEqual('alert');
    expect.soft(await alertDetails.message).toEqual('Wrong password.');
  });

  test.skip('Login modal is closed after clicking close button', async ({
    page
  }) => {
    expect(await login.closeLoginModal()).toBe(false);
  });
});
