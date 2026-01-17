import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test.describe('Verify user can add product to cart', () => {
  test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.clickProductItem('Slip Joint Pliers');

    const productPage = new ProductPage(page);
    await expect(productPage.page).toHaveURL(/product?\//);
    await expect(productPage.productName).toHaveText('Slip Joint Pliers');
    expect(await productPage.getCurrency()).toContain('$');
    await expect(productPage.price).toHaveText('9.17');

    await expect(productPage.addToCartBtn).toBeVisible();
    await productPage.addToCartBtn.click();
    await expect(productPage.alertNotification).toContainText('Product added to shopping cart');
    await expect(productPage.alertNotification).toBeHidden({ timeout: 8000 });
    await expect(productPage.header.shoppingCartQuantity).toHaveText('1');

    await productPage.header.shoppingCart.click();
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.page).toHaveURL(/checkout/);
    await expect(checkoutPage.productTitle).toHaveCount(1);
    await expect(checkoutPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(checkoutPage.proceedBtn).toBeVisible();
  });
});
