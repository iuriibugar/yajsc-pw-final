import { expect } from '@playwright/test';
import { test } from './../fixtures';

const sortingTestData = [
  { sortOption: 'Price (Low - High)', direction: 'ascending' },
  { sortOption: 'Price (High - Low)', direction: 'descending' },
];

test.describe('Verify user can perform sorting by price (asc & desc)', { tag: '@smoke' }, () => {
  sortingTestData.forEach((sorting) => {
    test(`Verify products are sorted by price ${sorting.direction}`, async ({ app }) => {
      await test.step('Open home page', async () => {
        await app.homePage.open();
      });
      await test.step('Sort products by price and verify sorting', async () => {
        await app.homePage.selectSortOption(sorting.sortOption, 'sort=price');
        const productPrices = await app.homePage.productPrice.allInnerTexts();
        const sortedPrices = [...productPrices].sort();

        if (sorting.direction === 'descending') {
          sortedPrices.reverse();
        }
        expect(productPrices).toEqual(sortedPrices);
      });
    });
  });
});
