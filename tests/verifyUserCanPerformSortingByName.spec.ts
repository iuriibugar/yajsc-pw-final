import { expect } from '@playwright/test';
import { test } from './../fixtures';

const sortingTestData = [
  { sortOption: 'Name (A - Z)', direction: 'ascending' },
  { sortOption: 'Name (Z - A)', direction: 'descending' },
];

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  sortingTestData.forEach((sorting) => {
    test(`Verify products are sorted by name ${sorting.direction}`, async ({ app }) => {
      await app.homePage.open();
      await app.homePage.selectSortOption(sorting.sortOption, 'sort=name');
      const productNames = await app.homePage.productName.allInnerTexts();
      const sortedNames = [...productNames].sort();

      if (sorting.direction === 'descending') {
        sortedNames.reverse();
      }
      expect(productNames).toEqual(sortedNames);
    });
  });
});
