import { HomePage } from '../pages/home.page.js';
import { ProductPage } from '../pages/product.page.js';
import { CartPage } from '../pages/cart.page.js';
import { test, expect } from '@playwright/test';
import { products } from '../test-data/products.data.js';

test.describe('Cart page tests', () => {
  let home;
  let product;
  let cart;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    product = new ProductPage(page);
    cart = new CartPage(page);
    await page.goto('/');
  });

  test('Add to cart button', async ({ page }) => {
    await page.waitForTimeout(3000);
    await home.selectProductOnPage('Samsung galaxy s7');
    await product.clickAddToCart();
    await home.goToCart();
    await page.waitForTimeout(3000);
    const cartStatus = await cart.checkProductInCart(products.samsungGalaxyS7);
    expect(await cartStatus).toBe(true);
  });
 
  //   3. Dodać to do jakiegoś Jenkinsa
});
