import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const BASE_URL = process.env.BASE_URL || 'https://practicesoftwaretesting.com';

export const BASE_API_URL = process.env.BASE_API_URL || 'https://api.practicesoftwaretesting.com';

export const USER_NAME = process.env.USER_NAME || 'Jone Doe';

export const USER_EMAIL = process.env.USER_EMAIL || 'customer@practicesoftwaretesting.com';

export const USER_PASSWORD = process.env.USER_PASSWORD!;
