#!/usr/bin/env sh
set -e

echo "Generating Prisma client..."

cd packages/db

pnpm install
pnpm exec prisma generate
