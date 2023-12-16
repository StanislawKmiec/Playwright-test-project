import { Page } from '@playwright/test';

exports.ProductPage = class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtonLocator = page.getByRole('link', {
      name: 'Add to cart'
    });
  }

  async clickAddToCart() {
    await this.page.on('dialog', async (dialog) => {
      if (dialog.message().includes('added')) {
        await dialog.accept();
      }
    });

    await this.addToCartButtonLocator.click();
    await this.page.waitForTimeout(2000);
  }
};
