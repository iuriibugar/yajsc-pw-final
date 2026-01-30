import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { validCredentials } from '../testData/credentials';

const API_URL = 'https://api.practicesoftwaretesting.com';

test('verify token auth', async ({ app, request }) => {
  const resp = await request.post(`${API_URL}/users/login`, {
    data: {
      email: validCredentials.email,
      password: validCredentials.password,
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
