import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  page: Page;
  emailField: Locator;
  passwordField: Locator;
  loginBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emailField = this.page.getByTestId('email');
    this.passwordField = this.page.getByTestId('password');
    this.loginBtn = this.page.getByTestId('login-submit');
  }

  async open(): Promise<void> {
    await this.navigate('/auth/login');
  }

  async performLogin(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
  }
}
