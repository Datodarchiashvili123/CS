#!/bin/bash
# tsre.in-ის თვით-აღდგენა.
#
# რატომ: tsre.in-ის მარშრუტი playze-ის Caddy-შია. playze-ის deploy ცვლის
# docker/Caddyfile-ს და ფაილს *ჩაანაცვლებს* (ახალი inode), ხოლო კონტეინერს
# single-file bind-mount ძველ inode-ზე ამაგრებს — ამიტომ Caddy-მ შეიძლება
# ძველი (tsre-ს გარეშე) კონფიგი წაიკითხოს და საიტი ჩამოვარდეს.
#
# ეს სკრიპტი მხოლოდ მაშინ ერევა, როცა tsre.in მართლა არ პასუხობს და
# host-ის Caddyfile ვალიდურია. playze-ის ბლოკებს არ ცვლის.
#
# განთავსება: /opt/tsre-api/tsre-guard.sh
# cron:       */2 * * * * /opt/tsre-api/tsre-guard.sh

set -u
LOG=/var/log/tsre-guard.log
CADDYFILE=/opt/playze/docker/Caddyfile
CTR=playze-caddy-1

log() { echo "$(date -Is) $*" >> "$LOG"; }

code=$(curl -s -o /dev/null -w '%{http_code}' -m 10 \
       --resolve tsre.in:443:127.0.0.1 https://tsre.in/ 2>/dev/null)
[ "$code" = "200" ] && exit 0

log "tsre.in unhealthy (HTTP $code) — attempting repair"

if ! grep -q "^tsre\.in {" "$CADDYFILE"; then
  log "ABORT: no tsre.in block in $CADDYFILE (deploy dropped it; add it to the playze repo)"
  exit 1
fi

docker cp "$CADDYFILE" "$CTR":/tmp/Caddyfile.guard 2>>"$LOG" || { log "ABORT: docker cp failed"; exit 1; }

if ! docker exec "$CTR" caddy validate --config /tmp/Caddyfile.guard --adapter caddyfile >/dev/null 2>&1; then
  log "ABORT: config invalid — not reloading"
  exit 1
fi

docker exec "$CTR" caddy reload --config /tmp/Caddyfile.guard --adapter caddyfile >/dev/null 2>&1
sleep 3
new=$(curl -s -o /dev/null -w '%{http_code}' -m 10 \
      --resolve tsre.in:443:127.0.0.1 https://tsre.in/ 2>/dev/null)
log "reload done — tsre.in now HTTP $new"
