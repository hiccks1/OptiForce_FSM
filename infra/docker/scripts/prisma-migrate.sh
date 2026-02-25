#!/usr/bin/env sh
set -e

echo "Running Prisma migrations..."

cd packages/db

pnpm exec prisma migrate deploy
