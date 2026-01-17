import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { validCredentials } from '../testData/credentials';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.performLogin(validCredentials.email, validCredentials.password);

  const accountPage = new AccountPage(page);
  await expect(page).toHaveURL('/account');
  await expect(accountPage.accountTittle).toHaveText('My account');
  await expect(accountPage.header.navMenu).toHaveText('Jane Doe');

  await page.context().storageState({ path: authFile });
});
