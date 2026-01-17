import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  page: Page;
  navMenu: Locator;
  shoppingCart: Locator;
  shoppingCartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = this.page.getByTestId('nav-menu');
    this.shoppingCart = this.page.getByTestId('nav-cart');
    this.shoppingCartQuantity = this.page.getByTestId('cart-quantity');
  }
}
