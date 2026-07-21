# Deploy — tsre.in (CI/CD)

საიტი ჰოსტდება **playze.io-ს droplet-ზე** და ხელმისაწვდომია დომენზე **https://tsre.in**.
GitHub Actions ავტომატურად ატვირთავს ყოველ `main`-ზე push-ის შემდეგ.

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
1. **check** — ამოწმებს ყველა JS ფაილის სინტაქსს.
2. **deploy** — `rsync`-ით (SSH-ზე) ატვირთავს `computer-from-zero/`-ის შიგთავსს droplet-ის web root-ში.

> droplet-ის ერთჯერადი მომზადება (nginx, DNS, HTTPS): იხ. [DROPLET.md](DROPLET.md)

---

## საჭირო GitHub Secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | აღწერა | მაგალითი |
|--------|--------|----------|
| `DEPLOY_HOST` | droplet-ის IP ან დომენი | `tsre.in` ან `164.90.x.x` |
| `DEPLOY_USER` | SSH მომხმარებელი | `deploy` |
| `DEPLOY_SSH_KEY` | **პრივატული** SSH გასაღები (სრული ტექსტი) | `-----BEGIN OPENSSH PRIVATE KEY-----` ... |
| `DEPLOY_PATH` | პროექტის web root | `/var/www/tsre.in` |
| `DEPLOY_PORT` | *(არასავალდებულო)* SSH პორტი | `22` |

> სანამ secrets არ დაამატებ, workflow **მაინც წარმატებით გაივლის** (deploy გამოტოვდება warning-ით).

---

## deploy-გასაღების შექმნა

```bash
# 1. გასაღების წყვილი (ლოკალურად)
ssh-keygen -t ed25519 -C "github-deploy-tsre" -f deploy_key -N ""

# 2. საჯარო გასაღები droplet-ზე (deploy მომხმარებელს)
ssh-copy-id -i deploy_key.pub DEPLOY_USER@tsre.in

# 3. პრივატული გასაღების ტექსტი (ჩასვი DEPLOY_SSH_KEY-ში)
cat deploy_key
```

მერე `git push` → **Actions** ტაბში ნახავ deploy-ს. ხელით: Actions → *CI / Deploy to tsre.in* → **Run workflow**.

---

## ⚠️ გაფრთხილებები
- rsync იყენებს `--delete`-ს → `DEPLOY_PATH` **მხოლოდ ამ საიტის ცალკე დირექტორია** უნდა იყოს.
- პაროლი/გასაღები **მე ვერ დავამატებ** — ეს შენ უნდა გააკეთო GitHub-ის ინტერფეისში.
- საიტი სტატიკურია — build არ სჭირდება.
