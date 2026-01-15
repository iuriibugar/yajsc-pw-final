import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const sortingTestData = [
  { sortOption: 'Price (Low - High)', sortParam: 'sort=price,asc', direction: 'ascending' },
  { sortOption: 'Price (High - Low)', sortParam: 'sort=price,desc', direction: 'descending' },
];

test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  sortingTestData.forEach((sorting) => {
    test(`Verify products are sorted by price ${sorting.direction}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.open();

      await homePage.selectSortOption(sorting.sortOption);
      await page.waitForResponse((response) => response.url().includes('api.practicesoftwaretesting.com/products')
        && response.url().includes(sorting.sortParam)
        && response.status() === 200,
      );

      const productPrices = await homePage.productPrice.allInnerTexts();

      const sortedPrices = [...productPrices].sort();

      if (sorting.direction === 'descending') {
        sortedPrices.reverse();
      }
      expect(productPrices).toEqual(sortedPrices);
    });
  });
});
