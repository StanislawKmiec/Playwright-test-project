import { test, expect } from '@playwright/test';
import { homePageData } from '../test-data/home-page.data.js';
import { menuCategoriesData } from '../test-data/home-page.data.js';
import { HomePage } from '../pages/home.page.js'
import { ProductPage } from '../pages/product.page.js'

test.describe('Home page tests', () => {
  let home;
 
  
  test.beforeEach(async ({ page}) => {
    home = new HomePage(page)
    await page.goto("/")
  })

  test('Page title and url is correct', async ({ page }) => {

    await expect(page).toHaveTitle(homePageData.pageTitle);
    await expect(page).toHaveURL(homePageData.pageUrl);
    
  });

  test('Number of products in monitor category equals 2', async ({ page }) => {
    await home.selectMenuCategory(menuCategoriesData.monitors);
    await page.waitForSelector("//a[contains(text(), 'Apple monitor 24')]")
    const number = await home.returnNumberOfProducstsOnPage()

    expect(await number).toEqual(2)
  });

  test("Next button isn't visible after proceeding to next page", async ({ page }) => {
    const status = await home.goToNextPage();
    
    expect(await status).toBe(false);
  });
});
