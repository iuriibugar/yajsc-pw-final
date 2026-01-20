import { test as base } from '@playwright/test';
import { App } from './pages/app.page';
import path from 'path';

const authFile = path.join(__dirname, './playwright/.auth/user.json');

interface MyFixtures {
    app: App;
    loggedInApp: App;
}

export const test = base.extend<MyFixtures>({

  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: authFile,
    });
    const page = await context.newPage();
    const app = new App(page);
    await page.goto('/account');
    await use(app);
    await context.close();
  },
});
