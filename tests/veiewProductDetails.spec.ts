import { expect } from '@playwright/test';
import { test } from './../fixtures';

test.describe('Verify user can view product details', { tag: '@smoke' }, () => {
  test('Verify login with valid credentials', async ({ app }) => {
    await test.step('Open home page and click on product item', async () => {
      await app.homePage.open();
      await app.homePage.clickProductItem('Combination Pliers');
    });

    await test.step('Verify product details are displayed correctly', async () => {
      await expect(app.productPage.page).toHaveURL(/product?\//);
      expect(await app.productPage.getCurrency()).toContain('$');
      await expect(app.productPage.price).toHaveText('14.50');
      await expect(app.productPage.addToCartBtn).toBeVisible();
      await expect(app.productPage.addToFavoritesBtn).toBeVisible();
    });
  });
});
