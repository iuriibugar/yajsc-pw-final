import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const sortingTestData = [
  { sortOption: 'Name (A - Z)', sortParam: 'sort=name,asc', direction: 'ascending' },
  { sortOption: 'Name (Z - A)', sortParam: 'sort=name,desc', direction: 'descending' },
];

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  sortingTestData.forEach((sorting) => {
    test(`Verify products are sorted by name ${sorting.direction}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.open();

      await homePage.selectSortOption(sorting.sortOption);
      await page.waitForResponse((response) => response.url().includes('api.practicesoftwaretesting.com/products')
        && response.url().includes(sorting.sortParam)
        && response.status() === 200,
      );

      const productNames = await homePage.productName.allInnerTexts();

      const sortedNames = [...productNames].sort();

      if (sorting.direction === 'descending') {
        sortedNames.reverse();
      }
      expect(productNames).toEqual(sortedNames);
    });
  });
});
