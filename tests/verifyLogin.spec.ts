import { expect } from '@playwright/test';
import { test } from './../fixtures';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test.describe('Verify login with valid credentials', () => {
  test('Verify login with valid credentials', async ({ app, page }) => {
    await app.accountPage.open();
    await expect(page).toHaveURL('/account');
    await expect(app.accountPage.accountTittle).toHaveText('My account');
    await expect(app.accountPage.header.navMenu).toHaveText('Jane Doe');
  });
});
