#!/usr/bin/env bash
set -e

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

git commit -m "chore(backup): automated snapshot $(date -Iseconds)"
git push
