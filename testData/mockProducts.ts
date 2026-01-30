/* eslint-disable camelcase */
import { faker } from '@faker-js/faker';

export function generateMockProductsOnPage(count: number) {
  const data = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    is_location_offer: false,
    is_rental: false,
    co2_rating: 'D',
    in_stock: true,
    is_eco_friendly: false,
    product_image: {
      id: faker.string.uuid(),
      by_name: 'Helinton Fantin',
      by_url: 'https://unsplash.com/@fantin',
      source_name: 'Unsplash',
      source_url: 'https://unsplash.com/photos/W8BNwvOvW4M',
      file_name: 'pliers01.avif',
      title: faker.commerce.productName(),
    },
    category: {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      slug: faker.commerce.department(),
    },
    brand: {
      id: faker.string.uuid(),
      name: faker.company.name(),
    },
  }));

  const current_page = 1;
  const from = 1;
  const last_page = 1;
  const per_page = count;
  const to = count;
  const total = count;

  return {
    current_page,
    data,
    from,
    last_page,
    per_page,
    to,
    total,
  };
}
