import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const sortingTestData = [
  { sortOption: 'Name (A - Z)', direction: 'ascending' },
  { sortOption: 'Name (Z - A)', direction: 'descending' },
];

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  sortingTestData.forEach((sorting) => {
    test(`Verify products are sorted by name ${sorting.direction}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.open();
      await homePage.selectSortOption(sorting.sortOption, 'sort=name');
      const productNames = await homePage.productName.allInnerTexts();
      const sortedNames = [...productNames].sort();

      if (sorting.direction === 'descending') {
        sortedNames.reverse();
      }
      expect(productNames).toEqual(sortedNames);
    });
  });
});
