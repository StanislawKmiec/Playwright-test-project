import { Page } from '@playwright/test';
import {LoginPage} from '../pages/login.page.js'

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.menuCateogiresLocator = '#itemc';
    this.productsLocator = '.card.h-100 h4 a';
    this.nextButtonLocator = '#next2';
    this.body = '#tbodyid';
    this.loginButtonLocator = '#login2';
    this.logoutButtonLocator  = '#logout2';
    this.menuCartLocator = '#cartur'; 
    this.cartLocator = "//a[contains(text(),'Cart')]"
  }

  async selectMenuCategory(categoryName) {
    const categoriesLsit = await this.page.$$(this.menuCateogiresLocator);
    for (const category of categoriesLsit) {
      if (categoryName == (await category.textContent())) {
        await category.click();
        break;
      }
    }
  }

  async returnNumberOfProducstsOnPage() {
    const producstsList = await this.page.$$(this.productsLocator);
    const numberOfProducts = await producstsList.length;
    return numberOfProducts;
  }

  async goToNextPage() {
    await this.page.waitForSelector(this.nextButtonLocator);
    await this.page.waitForSelector(this.body);
    await this.page.locator(this.nextButtonLocator).click();
    await this.page.waitForTimeout(3000);
    const visibilityOfNext = await this.page
      .locator(this.nextButtonLocator)
      .isVisible();
    return visibilityOfNext;
  }

  async goToLoginModal() {
    await this.page.locator(this.loginButtonLocator).click()
  }

  async goToCart() {
    await this.page.locator(this.menuCartLocator).click()
  }

  async selectProductOnPage(productName) {
    const productsList = await this.page.$$(this.productsLocator);
    await this.page.waitForSelector(this.productsLocator)
    
    for (const product of productsList) {
      if (productName === (await product.textContent())) {
        await product.click()
        break;
      }
    }
  }

  async goToCart() {
    await this.page.locator(this.cartLocator).click()

  }
};
