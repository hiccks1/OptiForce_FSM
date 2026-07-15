#!/usr/bin/env bash
set -e

echo "======================================"
echo " FSM FULL NUCLEAR RESET (PNPM + PRISMA)"
echo "======================================"

ROOT="$(pwd)"

###
# Docker – FSM ONLY
###
echo "→ Stopping FSM containers"
docker compose -f infra/docker/docker-compose.yaml down -v || true

echo "→ Removing FSM containers"
docker rm -f fsm@_postgres fsm@_redis fsm@_minio 2>/dev/null || true

echo "→ Removing FSM volumes"
docker volume rm fsm_postgres_data 2>/dev/null || true

echo "→ Docker prune"
docker system prune -af --volumes

###
# Repo cleanup
###
echo "→ Removing node_modules / locks / turbo"

rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
rm -rf pnpm-lock.yaml
rm -rf .turbo
rm -rf apps/*/.turbo
rm -rf packages/*/.turbo

###
# PNPM cache/store
###
echo "→ PNPM store + cache clean"

pnpm store prune || true
pnpm cache clean --all || true

###
# Fresh install
###
echo "→ PNPM install"

pnpm install

###
# Bring up INFRA ONLY
###
echo "→ Starting postgres / redis / minio"

docker compose -f infra/docker/docker-compose.yaml up -d postgres redis minio

###
# Wait for Postgres
###
echo "→ Waiting for Postgres..."

until docker exec fsm@_postgres pg_isready -U fsm -d fsm; do
  sleep 2
done

###
# Prisma 7.3 (DEPLOY ONLY)
###
echo "→ Prisma generate"
pnpm --filter @fsm/db exec prisma generate

echo "→ Prisma migrate deploy"
pnpm --filter @fsm/db exec prisma migrate deploy

###
# Full stack
###
echo "→ Starting full stack"

docker compose -f infra/docker/docker-compose.yaml up -d

echo "======================================"
echo " FSM RESET COMPLETE"
echo "======================================"
