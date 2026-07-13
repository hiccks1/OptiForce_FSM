#!/usr/bin/env bash
set -e

echo "Waiting for Postgres..."

until pg_isready -h localhost -p 5432 -U fsm; do
  sleep 2
done

echo "Postgres ready."
