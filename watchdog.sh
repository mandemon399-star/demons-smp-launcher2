#!/usr/bin/env bash
set -e

# Simple watchdog to restart the Python static server if it exits.
# Usage: chmod +x ./watchdog.sh && ./watchdog.sh

PORT=8000
LOGFILE=watchdog.log

while true; do
  echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") - starting http.server on port $PORT" | tee -a "$LOGFILE"
  # Run the server in foreground so we can restart when it exits
  python3 -m http.server "$PORT"
  echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ") - http.server exited, restarting in 5s" | tee -a "$LOGFILE"
  sleep 5
done
