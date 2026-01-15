import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  page: Page;
  productTitle: Locator;
  proceedBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedBtn = this.page.getByTestId('proceed-1');
  }
}
