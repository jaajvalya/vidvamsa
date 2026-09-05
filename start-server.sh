#!/bin/bash
# ─────────────────────────────────────────────
#  Vidvamsa — Dev Server Startup Script
#  Usage: ./start-server.sh [port]
#  Default port: 8080
# ─────────────────────────────────────────────

PORT=${1:-8080}
SRC_DIR="$(cd "$(dirname "$0")/src" && pwd)"

echo ""
echo "  ╔════════════════════════════════════════╗"
echo "  ║   Vidvamsa Dev Server                  ║"
echo "  ║   http://localhost:${PORT}              ║"
echo "  ╚════════════════════════════════════════╝"
echo ""

# Kill any existing server on the port
lsof -ti :${PORT} 2>/dev/null | xargs kill -9 2>/dev/null || true

cd "$SRC_DIR"

# Use Python (ships with macOS/Linux) — no npm install needed
if command -v python3 &>/dev/null; then
    echo "  Starting Python HTTP server on port ${PORT}..."
    echo "  Press Ctrl+C to stop."
    echo ""
    python3 -m http.server ${PORT}
elif command -v npx &>/dev/null; then
    echo "  Starting npx serve on port ${PORT}..."
    echo "  Press Ctrl+C to stop."
    echo ""
    npx --yes serve . -l ${PORT}
else
    echo "  ERROR: Neither python3 nor npx found."
    echo "  Install Node.js or Python 3 to run the server."
    exit 1
fi
