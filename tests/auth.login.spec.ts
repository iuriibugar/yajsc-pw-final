import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup.describe('Login tests', () => {
  setup.skip(!!process.env.CI, 'Skip on CI');
  setup('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.performLogin(USER_EMAIL, USER_PASSWORD);

    const accountPage = new AccountPage(page);
    await expect(page).toHaveURL('/account');
    await expect(accountPage.accountTittle).toHaveText('My account');
    await expect(accountPage.header.navMenu).toHaveText('Jane Doe');

    await page.context().storageState({ path: authFile });
  });
});
