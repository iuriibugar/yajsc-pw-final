import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  page: Page;
  productName: Locator;
  productPrice: Locator;
  sortDropdown: Locator;
  filterCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productName = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('product-price');
    this.sortDropdown = this.page.getByTestId('sort');
    this.filterCheckbox = this.page.locator('label');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async clickProductItem(productName: string): Promise<void> {
    await this.productName.filter({ hasText: productName }).click();
  }

  async selectSortOption(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: sortOption });
  }

  async selectFilterCheckbox(filter: string): Promise<void> {
    await this.filterCheckbox.filter({ hasText: filter }).click();
  }
}
