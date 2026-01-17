import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from './fragments/header.fragment';

export class BasePage {
  page: Page;
  header: HeaderFragment;
  alertNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.alertNotification = this.page.getByRole('alert');
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
