import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  page: Page;
  productTitle: Locator;
  productPrice: Locator;
  proceedBtn1: Locator;
  proceedBtn2: Locator;
  loggedInText: Locator;
  state: Locator;
  postalCode: Locator;
  proceedBtn3: Locator;
  paymentMethod: Locator;
  creditCardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  cardHolderName: Locator;
  confirmBtn: Locator;
  paymentSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedBtn1 = this.page.getByTestId('proceed-1');
    this.productPrice = this.page.getByTestId('product-price');
    this.loggedInText = this.page.locator('.login-container p');
    this.proceedBtn2 = this.page.getByTestId('proceed-2');
    this.state = this.page.getByTestId('state');
    this.postalCode = this.page.getByTestId('postal_code');
    this.proceedBtn3 = this.page.getByTestId('proceed-3');
    this.paymentMethod = this.page.getByTestId('payment-method');
    this.creditCardNumber = this.page.getByTestId('credit_card_number');
    this.expirationDate = this.page.getByTestId('expiration_date');
    this.cvv = this.page.getByTestId('cvv');
    this.cardHolderName = this.page.getByTestId('card_holder_name');
    this.confirmBtn = this.page.getByTestId('finish');
    this.paymentSuccessMessage = this.page.getByTestId('payment-success-message');
  }
}
