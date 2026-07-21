# Deploy — youtome.cc (CI/CD)

GitHub Actions ავტომატურად ატვირთავს საიტს **youtome.cc**-ზე ყოველ `main`-ზე push-ის შემდეგ.

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
1. **check** — ამოწმებს ყველა JS ფაილის სინტაქსს.
2. **deploy** — თუ ამოწმება გაიარა, `rsync`-ით (SSH-ზე) ატვირთავს `computer-from-zero/`-ის შიგთავსს სერვერის web root-ში.

---

## საჭირო GitHub Secrets

დაამატე რეპოში: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | აღწერა | მაგალითი |
|--------|--------|----------|
| `DEPLOY_HOST` | სერვერის მისამართი | `youtome.cc` ან IP |
| `DEPLOY_USER` | SSH მომხმარებელი | `deploy` / `root` |
| `DEPLOY_SSH_KEY` | **პრივატული** SSH გასაღები (სრული ტექსტი) | `-----BEGIN OPENSSH PRIVATE KEY-----` ... |
| `DEPLOY_PATH` | web root (სად ვდებთ ფაილებს) | `/var/www/youtome.cc/html` |
| `DEPLOY_PORT` | *(არასავალდებულო)* SSH პორტი | `22` (default) |

> სანამ secrets არ დაამატებ, workflow **მაინც წარმატებით გაივლის** (deploy უბრალოდ გამოტოვდება warning-ით). secrets-ის დამატების შემდეგ შემდეგი push ატვირთავს.

---

## ერთჯერადი მომზადება

**1. შექმენი deploy-გასაღები** (ლოკალურ კომპიუტერზე):

```bash
ssh-keygen -t ed25519 -C "github-deploy-youtome" -f deploy_key -N ""
```

მიიღებ: `deploy_key` (პრივატული) და `deploy_key.pub` (საჯარო).

**2. საჯარო გასაღები დაამატე სერვერზე** (deploy მომხმარებლის `authorized_keys`-ში):

```bash
ssh-copy-id -i deploy_key.pub DEPLOY_USER@youtome.cc
# ან ხელით:
cat deploy_key.pub | ssh DEPLOY_USER@youtome.cc 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

**3. GitHub Secrets-ში ჩასვი:**
- `DEPLOY_SSH_KEY` = `deploy_key`-ის **სრული ტექსტი** (`cat deploy_key`).
- `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH` = შესაბამისი მნიშვნელობები.

**4. push გააკეთე** `main`-ზე → **Actions** ტაბში ნახავ deploy-ს.
ხელით გასაშვებად: Actions → *CI / Deploy to youtome.cc* → **Run workflow**.

---

## ⚠️ გაფრთხილებები
- rsync იყენებს `--delete`-ს → `DEPLOY_PATH` **მხოლოდ ამ საიტის ცალკე დირექტორია** უნდა იყოს (სხვა ფაილებს წაშლის).
- პაროლი/გასაღები **მე ვერ დავამატებ** — უსაფრთხოებისთვის ეს შენ უნდა გააკეთო GitHub-ის ინტერფეისში.
- საიტი სტატიკურია — build არ სჭირდება; `serve.py` (dev სერვერი) ატვირთვისას გამოირიცხება.
