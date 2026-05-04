#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."
until node -e "
const { Client } = require('pg');
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
client.connect().then(() => { client.end(); process.exit(0); }).catch(() => process.exit(1));
" 2>/dev/null; do
  echo "  PostgreSQL unavailable - retrying in 2s..."
  sleep 2
done

echo "PostgreSQL is ready."

if [ "${RUN_MIGRATIONS}" = "true" ]; then
  echo "Running database migrations..."
  node -e "
const dataSource = require('./dist/database/data-source').default;
dataSource.initialize()
  .then(() => dataSource.runMigrations())
  .then(() => { console.log('Migrations complete.'); dataSource.destroy(); })
  .catch(err => { console.error('Migration failed:', err); process.exit(1); });
"
fi

if [ "${RUN_SEED}" = "true" ]; then
  echo "Running database seed..."
  node dist/database/seed.js
fi

echo "Starting application..."
exec node dist/main
