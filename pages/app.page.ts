import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { LoginPage } from './login.page';
import { BasePage } from './base.page';
import { CheckoutPage } from './checkout.page';
import { HomePage } from './home.page';
import { ProductPage } from './product.page';

export class App {
  page: Page;
  accountPage: AccountPage;
  loginPage: LoginPage;
  basePage: BasePage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  productPage: ProductPage;
  constructor(page: Page) {
    this.page = page;
    this.accountPage = new AccountPage(page);
    this.loginPage = new LoginPage(page);
    this.basePage = new BasePage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
  }
}
