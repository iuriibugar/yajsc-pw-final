import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PowerTools } from '../enams/powerTools.enum';

const filterCategory = PowerTools.Sander;

test.describe('Verify user can filter products by category', () => {
  test(`Verify products are filter by category ${filterCategory}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.selectFilterCheckbox(filterCategory);
    const productNames = await homePage.productName.all();

    for (const product of productNames) {
      const text = await product.innerText();
      expect(text).toContain(filterCategory);
    }
  });
});
