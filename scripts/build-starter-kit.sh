#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/starter-kit/src"
OUT_ZIP="$ROOT_DIR/starter-kit/ai-agency-starter-kit.zip"

if [ ! -d "$SRC_DIR" ]; then
  echo "Missing source directory: $SRC_DIR" >&2
  exit 1
fi

rm -f "$OUT_ZIP"
(
  cd "$SRC_DIR"
  zip -r "$OUT_ZIP" .
)

echo "Created $OUT_ZIP"
