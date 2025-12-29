import { Page } from '@playwright/test';
import { HeaderFragment } from './fragments/header.fragment';

export class BasePage {
  page: Page;
  header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
