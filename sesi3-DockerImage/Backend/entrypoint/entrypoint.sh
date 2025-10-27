#!/bin/sh
set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running database seed script..."
npx prisma db seed

echo "Starting the application..."
npm run start
