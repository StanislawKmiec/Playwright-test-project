import { test, expect } from '@playwright/test';

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.productTitleLocator = '//tr/td[2]';
  }

  async checkProductInCart(addedProduct) {
    const productsInCart = await this.page.$$(this.productTitleLocator);

    for (const productName of productsInCart) {
      if ((await productName.textContent()) === addedProduct) {
        return true;
        break;
      } else {
        return false;
        break;
      }
    }
  }
};
