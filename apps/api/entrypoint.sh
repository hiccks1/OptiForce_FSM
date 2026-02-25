#!/usr/bin/env sh
set -e

./scripts/migrate/run.sh
node dist/index.js
