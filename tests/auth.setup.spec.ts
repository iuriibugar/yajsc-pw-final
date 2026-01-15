import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';

const email = 'customer@practicesoftwaretesting.com';
const password = 'welcome01';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.performLogin(email, password);

  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});
