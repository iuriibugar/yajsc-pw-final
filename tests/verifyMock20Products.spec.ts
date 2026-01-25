import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { generateMockProductsOnPage } from '../testData/mockProducts';

test.describe('Verify user can see mock 20 products on page', () => {
  test('Verify user can see mock 20 products on page', async ({ loggedInApp }) => {
    const mockProducts = generateMockProductsOnPage(20);

    await loggedInApp.page.route('**/products*', async (route) => {
      await route.fulfill({ json: mockProducts });
    });

    await loggedInApp.homePage.open();
    expect(await loggedInApp.homePage.productName.count()).toBe(20);
    const productNames = await loggedInApp.homePage.productName.all();

    const mockProductNames = mockProducts.data.map((product) => product.name);

    for (const product of productNames) {
      const text = await product.innerText();
      expect(mockProductNames).toContain(text);
    }
  });
});
