import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  page: Page;
  priceSection: Locator;
  price: Locator;
  addToCartBtn: Locator;
  addToFavoritesBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.priceSection = this.page.locator('.price-section');
    this.price = this.page.getByTestId('unit-price');
    this.addToCartBtn = this.page.getByTestId('add-to-cart');
    this.addToFavoritesBtn = this.page.getByTestId('add-to-favorites');
  }

  async getCurrency(): Promise<string> {
    const fullText = await this.priceSection.textContent();
    return fullText?.replace(/[\d.]/g, '').trim() || '';
  }
}
