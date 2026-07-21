# Droplet setup — tsre.in

playze.io-ს (DigitalOcean-ტიპის) Ubuntu droplet-ზე საიტის გაშვება დომენზე **tsre.in**.
ეს ერთჯერადი ნაბიჯებია; შემდეგ ატვირთვა [CI/CD](DEPLOY.md)-ს ავტომატურად ხდება.

> ჩაანაცვლე `DROPLET_IP` და `DEPLOY_USER` შენი მნიშვნელობებით.

---

## 1. DNS — დომენის მიბმა (tsre.in-ის დომენის პანელში)

დაამატე A ჩანაწერები, რომ tsre.in მიუთითებდეს droplet-ის IP-ს:

| Host | Type | Value |
|------|------|-------|
| `@` (tsre.in) | A | `DROPLET_IP` |
| `www` | A | `DROPLET_IP` |

გადამოწმება (რამდენიმე წუთში): `dig +short tsre.in`

---

## 2. სერვერზე — nginx და პროექტის საქაღალდე

SSH-ით შედი droplet-ზე და გაუშვი:

```bash
# nginx
sudo apt update && sudo apt install -y nginx

# პროექტის საქაღალდე
sudo mkdir -p /var/www/tsre.in
sudo chown -R "$USER":"$USER" /var/www/tsre.in

# nginx server block (ამ დომენს ამ საქაღალდეს უკავშირებს)
sudo tee /etc/nginx/sites-available/tsre.in >/dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name tsre.in www.tsre.in;
    root /var/www/tsre.in;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/tsre.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

ამ მომენტში `http://tsre.in` უკვე მუშაობს (ცარიელი, სანამ არ ატვირთავ).

---

## 3. deploy-გასაღები (GitHub → droplet)

ლოკალურად შექმენი გასაღები და საჯარო ნაწილი დაამატე droplet-ზე:

```bash
ssh-keygen -t ed25519 -C "github-deploy-tsre" -f deploy_key -N ""
ssh-copy-id -i deploy_key.pub DEPLOY_USER@tsre.in
```

დარწმუნდი, რომ ეს მომხმარებელი წერს `/var/www/tsre.in`-ში (მე-2 ნაბიჯის `chown` ამას აგვარებს).

---

## 4. GitHub Secrets

**Settings → Secrets and variables → Actions:**

| Secret | მნიშვნელობა |
|--------|-------------|
| `DEPLOY_HOST` | `tsre.in` (ან `DROPLET_IP`) |
| `DEPLOY_USER` | `DEPLOY_USER` |
| `DEPLOY_SSH_KEY` | `cat deploy_key`-ის სრული ტექსტი |
| `DEPLOY_PATH` | `/var/www/tsre.in` |
| `DEPLOY_PORT` | *(თუ 22 არაა)* |

---

## 5. HTTPS (უფასო, Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tsre.in -d www.tsre.in
```

certbot ავტომატურად დააყენებს სერტიფიკატს და გადაამისამართებს http → https.

---

## 6. ატვირთვა

```bash
git push        # → Actions → deploy → https://tsre.in 🎉
```

---

## ➕ მეორე პროექტი იმავე droplet-ზე

გაიმეორე იგივე ლოგიკა სხვა საქაღალდით და დომენით:

```nginx
# /etc/nginx/sites-available/other-project
server {
    listen 80;
    server_name other-domain.com;
    root /var/www/other-project;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

ერთი droplet, ერთი IP, ბევრი დომენი — nginx `server_name`-ით ამიჯნავს.
