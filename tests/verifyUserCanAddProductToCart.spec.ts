import { expect } from '@playwright/test';
import { test } from './../fixtures';

test.describe('Verify user can add product to cart', { tag: '@regression' }, () => {
  test('Verify user can add product to cart', async ({ loggedInApp }) => {
    await loggedInApp.homePage.open();
    await loggedInApp.homePage.clickProductItem('Slip Joint Pliers');

    await expect(loggedInApp.productPage.page).toHaveURL(/product?\//);
    await expect(loggedInApp.productPage.productName).toHaveText('Slip Joint Pliers');
    expect(await loggedInApp.productPage.getCurrency()).toContain('$');
    await expect(loggedInApp.productPage.price).toHaveText('9.17');

    await expect(loggedInApp.productPage.addToCartBtn).toBeVisible();
    await loggedInApp.productPage.addToCartBtn.click();
    await expect(loggedInApp.productPage.alertNotification).toContainText('Product added to shopping cart');
    await expect(loggedInApp.productPage.alertNotification).toBeHidden({ timeout: 8000 });
    await expect(loggedInApp.productPage.header.shoppingCartQuantity).toHaveText('1');

    await loggedInApp.productPage.header.shoppingCart.click();
    await expect(loggedInApp.checkoutPage.page).toHaveURL(/checkout/);
    await expect(loggedInApp.checkoutPage.productTitle).toHaveCount(1);
    await expect(loggedInApp.checkoutPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(loggedInApp.checkoutPage.proceedBtn1).toBeVisible();
  });
});
