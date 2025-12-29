import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test.describe('Verify user can view product details', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.clickProductItem('Combination Pliers');

    const productPage = new ProductPage(page);
    await expect( productPage.page).toHaveURL(/product?\//);
    expect(await productPage.getCurrency()).toContain('$');
    await expect(productPage.price).toHaveText('14.15');
    await expect(productPage.addToCartBtn).toBeVisible();
    await expect(productPage.addToFavoritesBtn).toBeVisible();
  });
});
