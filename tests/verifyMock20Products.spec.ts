import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { generateMockProductsOnPage } from '../testData/mockProducts';

test.describe('Verify user can see mock 20 products on page', { tag: '@regression' }, () => {
  test('Verify user can see mock 20 products on page', async ({ loggedInApp }) => {
    const mockProducts = generateMockProductsOnPage(20);

    await test.step('Mock products and route', async () => {
      await loggedInApp.page.route('**/products*', async (route) => {
        await route.fulfill({ json: mockProducts });
      });
    });

    await test.step('Open home page', async () => {
      await loggedInApp.homePage.open();
    });

    await expect.poll(async () => loggedInApp.homePage.productName.first().isVisible()).toBe(true);

    await test.step('Verify 20 products are displayed', async () => {
      expect(await loggedInApp.homePage.productName.count()).toBe(20);
      const productNames = await loggedInApp.homePage.productName.all();

      const mockProductNames = mockProducts.data.map((product) => product.name);

      for (const product of productNames) {
        const text = await product.innerText();
        expect(mockProductNames).toContain(text);
      }
    });
  });
});
