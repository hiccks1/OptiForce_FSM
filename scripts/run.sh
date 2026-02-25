#!/usr/bin/env bash
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[FSM]${NC} $1"; }
warn() { echo -e "${YELLOW}[FSM]${NC} $1"; }
die()  { echo -e "${RED}[FSM]${NC} $1"; exit 1; }

# Load env from repo root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

wait_for_postgres() {
  log "Waiting for Postgres..."
  until docker exec fsm-postgres pg_isready -U postgres -d fsm >/dev/null 2>&1; do
    sleep 1
  done
  log "Postgres is ready!"
}

wait_for_redis() {
  log "Waiting for Redis..."
  until docker exec fsm-redis redis-cli ping >/dev/null 2>&1; do
    sleep 1
  done
  log "Redis is ready!"
}

wait_for_minio() {
  log "Waiting for MinIO..."
  until curl -sf http://localhost:9000/minio/health/live >/dev/null 2>&1; do
    sleep 1
  done
  log "MinIO is ready!"
}

start_infra() {
  log "Starting infrastructure..."
  docker compose -f infra/docker/docker-compose.yml --env-file .env up -d
  wait_for_postgres
  wait_for_redis
  wait_for_minio
}

run_prisma_once() {
  log "Generating Prisma client..."
  pnpm --filter @fsm/db db:generate

  # You have no migrations, so deploy does nothing. Use db push to create tables.
  log "Pushing Prisma schema to DB (db push)..."
  pnpm --filter @fsm/db db:push
}

case "${1:-}" in
  dev)
    start_infra
    run_prisma_once
    log "Starting dev servers..."
    pnpm turbo dev
    ;;
  migrate)
    start_infra
    run_prisma_once
    ;;
  infra)
    start_infra
    ;;
  down)
    log "Stopping infrastructure..."
    docker compose -f infra/docker/docker-compose.yml down
    ;;
  *)
    echo "Usage: ./scripts/run.sh {dev|migrate|infra|down}"
    exit 1
    ;;
esac
