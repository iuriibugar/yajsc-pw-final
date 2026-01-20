import { expect } from '@playwright/test';
import { test } from './../fixtures';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test.describe('Verify user can add product to cart', () => {
  test('Verify user can add product to cart', async ({ app }) => {
    await app.homePage.open();
    await app.homePage.clickProductItem('Slip Joint Pliers');

    await expect(app.productPage.page).toHaveURL(/product?\//);
    await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
    expect(await app.productPage.getCurrency()).toContain('$');
    await expect(app.productPage.price).toHaveText('9.17');

    await expect(app.productPage.addToCartBtn).toBeVisible();
    await app.productPage.addToCartBtn.click();
    await expect(app.productPage.alertNotification).toContainText('Product added to shopping cart');
    await expect(app.productPage.alertNotification).toBeHidden({ timeout: 8000 });
    await expect(app.productPage.header.shoppingCartQuantity).toHaveText('1');

    await app.productPage.header.shoppingCart.click();
    await expect(app.checkoutPage.page).toHaveURL(/checkout/);
    await expect(app.checkoutPage.productTitle).toHaveCount(1);
    await expect(app.checkoutPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(app.checkoutPage.proceedBtn1).toBeVisible();
  });
});
