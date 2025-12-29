import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  page: Page;
  accountTittle: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.accountTittle = this.page.getByTestId('page-title');
  }
}
