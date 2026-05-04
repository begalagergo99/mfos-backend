import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource, Repository } from 'typeorm';
import AppDataSource from './data-source';
import { Restaurant } from '../modules/restaurants/models/entities/restaurant.entity';
import { MenuItem } from '../modules/restaurants/models/entities/menu-item.entity';

interface SeedMenuItem {
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}

interface SeedRestaurant {
  name: string;
  description: string | null;
  address: string | null;
  menuItems: SeedMenuItem[];
}

function loadSeedRestaurants(): SeedRestaurant[] {
  const filePath = path.join(__dirname, 'seed-data', 'restaurants.seed.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as SeedRestaurant[];
}

async function restaurantExists(
  restaurantRepository: Repository<Restaurant>,
  name: string,
): Promise<boolean> {
  const count = await restaurantRepository.countBy({ name });
  return count > 0;
}

async function createRestaurantWithMenu(
  restaurantRepository: Repository<Restaurant>,
  menuItemRepository: Repository<MenuItem>,
  seedRestaurant: SeedRestaurant,
): Promise<void> {
  const restaurant = restaurantRepository.create({
    name: seedRestaurant.name,
    description: seedRestaurant.description,
    address: seedRestaurant.address,
  });
  const savedRestaurant = await restaurantRepository.save(restaurant);

  const menuItems = seedRestaurant.menuItems.map((seedItem) =>
    menuItemRepository.create({
      name: seedItem.name,
      description: seedItem.description,
      price: seedItem.price,
      isAvailable: seedItem.isAvailable,
      restaurant: savedRestaurant,
    }),
  );
  await menuItemRepository.save(menuItems);

  console.log(
    `  Created "${savedRestaurant.name}" with ${menuItems.length} menu item(s).`,
  );
}

async function seedRestaurants(dataSource: DataSource): Promise<void> {
  const restaurantRepository = dataSource.getRepository(Restaurant);
  const menuItemRepository = dataSource.getRepository(MenuItem);

  const seedData = loadSeedRestaurants();
  console.log(`Seeding ${seedData.length} restaurant(s)...`);

  for (const seedRestaurant of seedData) {
    const alreadyExists = await restaurantExists(
      restaurantRepository,
      seedRestaurant.name,
    );

    if (alreadyExists) {
      console.log(`  Skipping "${seedRestaurant.name}" (already exists).`);
      continue;
    }

    await createRestaurantWithMenu(
      restaurantRepository,
      menuItemRepository,
      seedRestaurant,
    );
  }

  console.log('Seeding complete.');
}

async function main(): Promise<void> {
  await AppDataSource.initialize();
  console.log('Database connection established.');

  try {
    await seedRestaurants(AppDataSource);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  }
}

main().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
