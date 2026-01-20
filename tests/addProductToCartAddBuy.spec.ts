import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Check user can add product to cart and buy it', () => {
  test('Check user can add product to cart and buy it', async ({ loggedInApp }) => {
    await expect(loggedInApp.accountPage.page).toHaveURL('/account');
    await loggedInApp.homePage.open();
    await loggedInApp.homePage.productName.first().click();

    const productName = await loggedInApp.productPage.productName.innerText();
    const productPrice = (await loggedInApp.productPage.price.innerText()).replace('$', '');
    await loggedInApp.productPage.addToCartBtn.click();
    await expect(loggedInApp.productPage.alertNotification).toContainText('Product added to shopping cart');
    await expect(loggedInApp.accountPage.header.navMenu).toHaveText('Jane Doe');

    await loggedInApp.productPage.header.shoppingCart.click();
    await expect(loggedInApp.checkoutPage.productTitle).toHaveText(productName);
    await expect(loggedInApp.checkoutPage.productPrice).toContainText(productPrice);
    await loggedInApp.checkoutPage.proceedBtn1.click();

    await expect(loggedInApp.checkoutPage.loggedInText).toHaveText('Hello Jane Doe, you are already logged in. You can proceed to checkout.');
    await loggedInApp.checkoutPage.proceedBtn2.click();

    await loggedInApp.checkoutPage.state.waitFor({ state: 'visible' });
    await loggedInApp.checkoutPage.state.fill('California');
    await loggedInApp.checkoutPage.postalCode.waitFor({ state: 'visible' });
    await loggedInApp.checkoutPage.postalCode.fill('90001');
    await loggedInApp.checkoutPage.proceedBtn3.click();

    await loggedInApp.checkoutPage.paymentMethod.selectOption('credit-card');
    await loggedInApp.checkoutPage.creditCardNumber.fill('1111-1111-1111-1111');

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 3);
    const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
    const year = String(expirationDate.getFullYear());
    await loggedInApp.checkoutPage.expirationDate.fill(`${month}/${year}`);

    await loggedInApp.checkoutPage.cvv.fill('111');
    await loggedInApp.checkoutPage.cardHolderName.fill('Jane Doe');
    await loggedInApp.checkoutPage.confirmBtn.click();

    await expect(loggedInApp.checkoutPage.paymentSuccessMessage).toHaveText('Payment was successful');
  });
});
