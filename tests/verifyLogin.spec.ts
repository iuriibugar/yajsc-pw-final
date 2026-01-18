import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/account.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test.describe('Verify login with valid credentials', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.open();
    await expect(page).toHaveURL('/account');
    await expect(accountPage.accountTittle).toHaveText('My account');
    await expect(accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
