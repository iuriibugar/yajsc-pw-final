import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  page: Page;
  productName: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productName = this.page.getByTestId('product-name');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async clickProductItem(productName: string): Promise<void> {
    await this.page.getByTestId('product-name').filter({ hasText: productName }).click();
  }
}
