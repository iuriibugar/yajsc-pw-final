import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { BASE_API_URL, USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';

test('verify token auth', async ({ app, request }) => {
  test.skip(!!process.env.CI, 'Skipping test on CI');
  const resp = await request.post(`${BASE_API_URL}/users/login`, {
    data: {
      email: USER_EMAIL,
      password: USER_PASSWORD,
    },
  });
  const jsonData = await resp.json();
  const token = jsonData.access_token;

  await app.basePage.page.goto('/');

  await app.page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
  }, token);
  await app.basePage.page.goto('/');

  await expect(app.basePage.header.navMenu).toContainText('Jane Doe');
});
