import { expect } from '@playwright/test';
import { test } from './../fixtures';

test.describe('Verify user can view product details', { tag: '@smoke' }, () => {
  test('Verify login with valid credentials', async ({ app }) => {
    await app.homePage.open();
    await app.homePage.clickProductItem('Combination Pliers');

    await expect(app.productPage.page).toHaveURL(/product?\//);
    expect(await app.productPage.getCurrency()).toContain('$');
    await expect(app.productPage.price).toHaveText('14.15');
    await expect(app.productPage.addToCartBtn).toBeVisible();
    await expect(app.productPage.addToFavoritesBtn).toBeVisible();
  });
});
