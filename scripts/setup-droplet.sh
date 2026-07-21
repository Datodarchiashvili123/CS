#!/usr/bin/env bash
#
# Droplet-ის ერთჯერადი მომზადება — nginx + (სურვილისამებრ) HTTPS.
# გაუშვი DROPLET-ზე (Ubuntu, sudo-ს უფლებით):
#
#   bash setup-droplet.sh <domain> [webroot] [certbot_email]
#
# მაგალითი:
#   bash setup-droplet.sh tsre.in
#   bash setup-droplet.sh tsre.in /var/www/tsre.in you@example.com
#
set -euo pipefail

DOMAIN="${1:-tsre.in}"
WEBROOT="${2:-/var/www/$DOMAIN}"
EMAIL="${3:-}"

echo "▶ დომენი:   $DOMAIN"
echo "▶ web root: $WEBROOT"
echo

echo "▶ nginx-ის ინსტალაცია..."
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx

echo "▶ საქაღალდის შექმნა..."
sudo mkdir -p "$WEBROOT"
sudo chown -R "$USER":"$USER" "$WEBROOT"
if [ ! -f "$WEBROOT/index.html" ]; then
  echo "<!doctype html><meta charset=utf-8><title>$DOMAIN</title><h1>$DOMAIN</h1><p>მალე...</p>" > "$WEBROOT/index.html"
fi

echo "▶ nginx server block..."
sudo tee "/etc/nginx/sites-available/$DOMAIN" >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    root $WEBROOT;
    index index.html;
    location / { try_files \$uri \$uri/ =404; }
}
NGINX

sudo ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
sudo nginx -t
sudo systemctl reload nginx
echo "✅ http://$DOMAIN მზადაა (web root: $WEBROOT)"
echo

if [ -n "$EMAIL" ]; then
  echo "▶ HTTPS (certbot)...  ⚠ DNS უკვე უნდა მიუთითებდეს ამ სერვერს!"
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx
  sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect
  echo "✅ https://$DOMAIN"
else
  echo "ℹ HTTPS-ისთვის (DNS-ის მიბმის შემდეგ):"
  echo "    sudo apt install -y certbot python3-certbot-nginx"
  echo "    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
fi

echo
echo "შემდეგი ნაბიჯი: შენს Mac-ზე გაუშვი  scripts/setup-github-deploy.sh"
