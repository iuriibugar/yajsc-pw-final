import { test as base } from '@playwright/test';
import { App } from './pages/app.page';
// import path from 'path';
import { BASE_API_URL, USER_EMAIL, USER_PASSWORD } from './config/baseConfig';

// const authFile = path.join(__dirname, './playwright/.auth/user.json');

interface MyFixtures {
  app: App;
  loggedInApp: App;
}

export const test = base.extend<MyFixtures>({

  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
  // Авторизація через API
  loggedInApp: async ({ request, page }, use) => {
    const resp = await request.post(`${BASE_API_URL}/users/login`, {
      data: {
        email: USER_EMAIL,
        password: USER_PASSWORD,
      },
    });
    const jsonData = await resp.json();
    const token = jsonData.access_token;

    await page.goto('/');
    await page.addInitScript((token) => {
      window.localStorage.setItem('auth-token', token);
    }, token);
    await page.reload();

    const app = new App(page);
    await use(app);
  },
  // Авторизація за допомогою UI
  // loggedInApp: async ({ browser }, use) => {
  //   const context = await browser.newContext({
  //     storageState: authFile,
  //   });
  //   const page = await context.newPage();
  //   const app = new App(page);
  //   await page.goto('/account');
  //   await use(app);
  //   await context.close();
  // },
});

export { expect } from '@playwright/test';
