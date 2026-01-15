import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

const email = 'customer@practicesoftwaretesting.com';
const password = 'welcome01';

test.describe('Verify login with valid credentials', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipping test on CI');

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.performLogin(email, password);

    const accountPage = new AccountPage(page);
    await expect(page).toHaveURL('/account');
    await expect(accountPage.accountTittle).toHaveText('My account');
    await expect(accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
