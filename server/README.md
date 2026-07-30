# TSRE — პროგრესის backend

პატარა API, რომელიც სტუდენტების პროგრესს **SQLite-ში** ინახავს და ლექტორის დაფას აწვდის —
რომ პროგრესი **მოწყობილობებს შორის** გაზიარდეს (და არა მხოლოდ ერთ ბრაუზერში).

- **დამოკიდებულების გარეშე**: Node-ის ჩაშენებული `http` + `node:sqlite`. `npm install` არ სჭირდება.
- **Node 22+** სავალდებულოა (`node:sqlite` იქ არის).
- ფრონტი (`app.js`, `auth.js`) ავტომატურად ეძებს `<origin>/api`-ს; თუ ვერ პოულობს — ჩუმად ბრუნდება localStorage-ზე (საიტი არ ტყდება).

> ⚠️ „honor system“ — ჩაწერა userId-ით ხდება, პაროლის გადამოწმების გარეშე (როგორც არსებული client-side login). სერიოზული უსაფრთხოება არ არის; საკლასო ინსტრუმენტია.

## ლოკალურად გაშვება

```bash
cd server
node server.js
```

→ `http://127.0.0.1:8787`. ბაზა იქმნება `server/data/progress.db`-ში.

ტესტი:

```bash
curl http://127.0.0.1:8787/api/health
```

ფრონტის ლოკალურ ტესტში (სხვა პორტზე) დააყენე `window.CFZ_API="http://127.0.0.1:8787/api"` index.html-ში.

## API

| მეთოდი | გზა | აღწერა |
|---|---|---|
| GET | `/api/health` | ცოცხალია თუ არა |
| GET | `/api/progress` | ყველა სტუდენტის პროგრესი (ლექტორის დაფა) |
| GET | `/api/progress/:userId` | ერთი მომხმარებლის პროგრესი (შესვლისას) |
| POST | `/api/progress` | `{userId, kind:"lessons"\|"assignments", id, done}` |

## სერვერზე განთავსება — ✅ უკვე გაშვებულია

`server/` **არ** არის `computer-from-zero/`-ში, ამიტომ CI (rsync) მას **არ** განალაგებს.
დეპლოი ერთხელ გაკეთდა ხელით; ქვემოთ ის, რაც რეალურად დგას სერვერზე.

- **Host**: DigitalOcean droplet `playze-prod` (`138.68.88.42`) — tsre.in-იც და playze.io-ც აქაა.
- **გზა**: `/opt/tsre-api/` (კოდი + `data/progress.db`).
- **გაშვება**: Docker, ცალკე compose-პროექტი `tsre` (`docker-compose.yml`), `restart: unless-stopped`.
- **Edge**: playze-ის Caddy კონტეინერი — `tsre.in` ბლოკში `/api/*` → `tsre-api:8787`.

### კოდის განახლება

```bash
rsync -av --exclude data --exclude node_modules server/ root@138.68.88.42:/opt/tsre-api/
ssh root@138.68.88.42 'cd /opt/tsre-api && docker compose up -d --force-recreate'
```

### ყოველდღიური ბრძანებები

```bash
cd /opt/tsre-api
docker compose ps            # სტატუსი
docker compose logs -f       # ლოგები
docker compose restart       # გადატვირთვა
```

### შემოწმება

```bash
curl https://tsre.in/api/health      # → {"ok":true,"users":3}
```

## ⚠️ დამოკიდებულება playze-ზე (ცნობიერი კომპრომისი)

tsre და playze **სხვადასხვა პროექტია**, უბრალოდ ერთ droplet-ზე. tsre-ს საკუთარი
compose-პროექტი აქვს და playze-ის სტეკში **არ** ურევია. მაგრამ ორი კვანძი საერთოა:

1. **Caddy** — 80/443-ს playze-ის Caddy იჭერს და tsre.in-ის სტატიკასაც ისევ ის ასდის
   (ეს ასე იყო ამ API-მდეც). `/api` მისივე `tsre.in` ბლოკშია.
2. **ქსელი** — `tsre-api` `playze_default`-ზეა (external), რომ Caddy მისწვდეს.

**შედეგი:** playze-ზე `docker compose down` წაშლის ამ ქსელს და **tsre.in/api ჩამოვარდება**
(თავად საიტიც, რადგან Caddy იმავე სტეკშია). სრული განცალკევება ცალკე droplet-ს ან
tsre-სთვის ცალკე edge-ს მოითხოვს.

### Rollback (თუ Caddy-ის ცვლილება უნდა გაუქმდეს)

```bash
ssh root@138.68.88.42 'cp /opt/playze/docker/Caddyfile.pre-tsre-api /opt/playze/docker/Caddyfile \
  && docker exec playze-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile'
```

## შენიშვნები

- **მომხმარებლები**: `server.js`-ის `KNOWN_USERS` სინქრონში დაიცავი `computer-from-zero/auth.js`-ის `USERS`-თან (ახლის დამატებისას განაახლე ორივე).
- **ბექაფი**: `/opt/tsre-api/data/progress.db` — ერთადერთი მდგომარეობა; დროდადრო დააკოპირე.
- **პორტი**: `docker-compose.yml`-ის `PORT`/`HOST` env-ით. კონტეინერში `HOST=0.0.0.0` სავალდებულოა (თორემ Caddy ვერ მისწვდება).
