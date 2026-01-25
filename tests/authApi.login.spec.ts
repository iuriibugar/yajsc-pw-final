import { test, expect } from '@playwright/test';
import { validCredentials } from '../testData/credentials';

test('verify token auth', async ({ page, request }) => {
  const resp = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: validCredentials.email,
      password: validCredentials.password,
    },
  });
  const jsonData = await resp.json();
  const token = jsonData.access_token;

  await page.goto('https://practicesoftwaretesting.com');

  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
  }, token);
  await page.reload();

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});
