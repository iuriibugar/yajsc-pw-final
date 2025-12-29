import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  page: Page;
  navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = this.page.getByTestId('nav-menu');
  }
}
