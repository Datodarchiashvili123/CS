#!/usr/bin/env bash
#
# tsre.in-ს ამატებს არსებულ Caddy (Docker) setup-ში, როგორც სტატიკურ საიტს.
# უსაფრთხოა: backup + idempotent + validate-before-recreate; ეხება მხოლოდ caddy-ს.
#
# გაუშვი DROPLET-ზე (playze-prod):
#   curl -fsSL https://raw.githubusercontent.com/Datodarchiashvili123/CS/main/scripts/setup-tsre-caddy.sh -o setup-tsre-caddy.sh
#   sudo bash setup-tsre-caddy.sh
#
set -euo pipefail

STACK="/opt/playze"
CADDYFILE="$STACK/docker/Caddyfile"
WEBROOT="/var/www/tsre.in"
DOMAIN="tsre.in"
CADDY_CONTAINER="playze-caddy-1"
STAMP="$(date +%s)"

echo "▶ web root: $WEBROOT"
mkdir -p "$WEBROOT"
if [ ! -f "$WEBROOT/index.html" ]; then
  echo "<!doctype html><meta charset=utf-8><title>$DOMAIN</title><h1>$DOMAIN</h1><p>მალე...</p>" > "$WEBROOT/index.html"
fi

# --- 1) Caddyfile ბლოკი (idempotent) ---
if grep -qF "$DOMAIN {" "$CADDYFILE"; then
  echo "ℹ Caddyfile-ში $DOMAIN უკვე არის — გამოვტოვე."
else
  cp "$CADDYFILE" "$CADDYFILE.bak.$STAMP"
  cat >> "$CADDYFILE" <<'CADDY'

# Computer From Zero — static course
tsre.in {
	import sechdrs
	encode gzip zstd
	root * /srv/tsre.in
	file_server
}
CADDY
  echo "✅ Caddyfile-ს დაემატა $DOMAIN ბლოკი (backup: $CADDYFILE.bak.$STAMP)."
fi

# --- 2) compose ფაილების პოვნა (რომლითაც caddy გაშვებულია) ---
COMPOSE_FILES="$(docker inspect "$CADDY_CONTAINER" --format '{{ index .Config.Labels "com.docker.compose.project.config_files" }}' 2>/dev/null || true)"
if [ -z "$COMPOSE_FILES" ]; then
  COMPOSE_FILES="$STACK/docker-compose.yml,$STACK/docker-compose.prod.yml"
fi
echo "▶ compose files: $COMPOSE_FILES"

IFS=',' read -ra CF <<< "$COMPOSE_FILES"

# --- 3) volume-ის დამატება იმ compose-ში, სადაც caddy-ს Caddyfile mount არის ---
TARGET_COMPOSE=""
for f in "${CF[@]}"; do
  if [ -f "$f" ] && grep -q 'docker/Caddyfile:/etc/caddy/Caddyfile' "$f"; then
    TARGET_COMPOSE="$f"
    break
  fi
done
if [ -z "$TARGET_COMPOSE" ]; then
  echo "❌ ვერ ვიპოვე caddy volumes compose ფაილში — გააჩერე და ხელით დაამატე:"
  echo "     - $WEBROOT:/srv/tsre.in:ro"
  exit 1
fi

if grep -qF "$WEBROOT:/srv/tsre.in" "$TARGET_COMPOSE"; then
  echo "ℹ volume უკვე არის — გამოვტოვე."
else
  cp "$TARGET_COMPOSE" "$TARGET_COMPOSE.bak.$STAMP"
  sed -i "s#- ./docker/Caddyfile:/etc/caddy/Caddyfile:ro#&\n      - $WEBROOT:/srv/tsre.in:ro#" "$TARGET_COMPOSE"
  echo "✅ volume დაემატა: $TARGET_COMPOSE (backup: $TARGET_COMPOSE.bak.$STAMP)."
fi

# --- 4) Caddyfile-ის ვალიდაცია (recreate-მდე) ---
echo "▶ Caddyfile validate..."
docker exec "$CADDY_CONTAINER" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile

# --- 5) caddy კონტეინერის ხელახლა აწევა (მხოლოდ caddy) ---
FARGS=()
for f in "${CF[@]}"; do
  [ -f "$f" ] && FARGS+=(-f "$f")
done
echo "▶ caddy კონტეინერის ხელახლა აწევა..."
cd "$STACK"
docker compose "${FARGS[@]}" up -d caddy

echo
echo "✅ მზადაა!"
echo "   1. DNS: tsre.in A → 138.68.88.42 (Cloudflare — თუ proxied-ზე certi ვერ იშვება, ჯერ 'DNS only')."
echo "   2. შემოწმება: curl -I https://tsre.in"
echo "   3. აპის ატვირთვა: GitHub Actions (DEPLOY_PATH=$WEBROOT) — იხ. DEPLOY.md."
