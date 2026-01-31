import { expect } from '@playwright/test';
import { test } from './../fixtures';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test.describe('Verify login with valid credentials', () => {
  test.skip(!!process.env.CI, 'Skip on CI');
  test('Verify login with valid credentials', async ({ loggedInApp, page }) => {
    await loggedInApp.accountPage.open();
    await expect(page).toHaveURL('/account');
    await expect(loggedInApp.accountPage.accountTittle).toHaveText('My account', { timeout: 10000 });
    await expect(loggedInApp.accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
