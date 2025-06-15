#!/bin/sh
# This entrypoint seeds the /app/world volume with the baked-in world data once.
# Subsequent restarts will find the volume non-empty and skip the copy.
set -e

SEED_DIR="/app/world-seed"
TARGET_DIR="/app/world"

# If the target world directory is empty (or absent) we populate it from the seed.
if [ ! -d "$TARGET_DIR/assets" ]; then
  echo "[entrypoint] No assets directory found – seeding world data"
  mkdir -p "$TARGET_DIR"
  # Copy everything (including dotfiles) but preserve permissions (-p)
  cp -rp "$SEED_DIR/." "$TARGET_DIR/"
  echo "[entrypoint] Seed copy complete"
else
  echo "[entrypoint] World data already present – skipping seeding"
fi

# Hand over to the image command
exec "$@" 