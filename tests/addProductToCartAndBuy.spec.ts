import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { generateExpirationDate } from '../utils/payment.utils';
import { ADDRESS_DATA, PAYMENT_DATA } from '../testData/checkout.data';

test.describe('Check user can add product to cart and buy it', { tag: '@smoke' }, () => {
  test('Check user can add product to cart and buy it', async ({ loggedInApp }) => {
    await test.step('Log in app and open home page', async () => {
      await loggedInApp.homePage.open();
      await expect(loggedInApp.accountPage.header.navMenu).toHaveText('Jane Doe');
    });

    await test.step('Click on first product name', async () => {
      await loggedInApp.homePage.productName.first().click();
    });

    await test.step('Get product name and price, add to cart, and verify', async () => {
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
      await loggedInApp.checkoutPage.state.fill(ADDRESS_DATA.state);
      await loggedInApp.checkoutPage.postalCode.waitFor({ state: 'visible' });
      await loggedInApp.checkoutPage.postalCode.fill(ADDRESS_DATA.postalCode);
      await loggedInApp.checkoutPage.proceedBtn3.click();

      await loggedInApp.checkoutPage.paymentMethod.selectOption('credit-card');
      await loggedInApp.checkoutPage.creditCardNumber.fill(PAYMENT_DATA.creditCardNumber);

      const expirationDate = generateExpirationDate();
      await loggedInApp.checkoutPage.expirationDate.fill(expirationDate);

      await loggedInApp.checkoutPage.cvv.fill(PAYMENT_DATA.cvv);
      await loggedInApp.checkoutPage.cardHolderName.fill(PAYMENT_DATA.cardHolderName);
      await loggedInApp.checkoutPage.confirmBtn.click();

      await expect(loggedInApp.checkoutPage.paymentSuccessMessage).toHaveText('Payment was successful');
    });
  });
});
