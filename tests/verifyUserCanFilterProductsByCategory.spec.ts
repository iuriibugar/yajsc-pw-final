import { expect } from '@playwright/test';
import { test } from './../fixtures';
import { PowerTools } from '../enams/powerTools.enum';

const filterCategory = PowerTools.Sander;

test.describe('Verify user can filter products by category', () => {
  test(`Verify products are filter by category ${filterCategory}`, async ({ app }) => {
    await app.homePage.open();
    await app.homePage.selectFilterCheckbox(filterCategory);
    const productNames = await app.homePage.productName.all();

    for (const product of productNames) {
      const text = await product.innerText();
      expect(text).toContain(filterCategory);
    }
  });
});
