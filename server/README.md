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

## სერვერზე განთავსება (tsre.in)

`server/` **არ** არის `computer-from-zero/`-ში, ამიტომ CI (rsync) მას **არ** განალაგებს — ეს ერთხელ ხელით უნდა გააკეთო.

### 1. კოდი სერვერზე

```bash
rsync -av server/ user@tsre.in:/opt/tsre-api/
```

### 2. systemd სერვისი (მუდმივად გაშვებული)

შექმენი `/etc/systemd/system/tsre-api.service`:

```ini
[Unit]
Description=TSRE progress API
After=network.target

[Service]
WorkingDirectory=/opt/tsre-api
ExecStart=/usr/bin/node server.js
Environment=PORT=8787
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now tsre-api
```

### 3. nginx — `/api`-ის პროქსი

tsre.in-ის server-ბლოკში დაამატე (სტატიკური `location /`-ის გვერდით):

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $host;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

ამის მერე `https://tsre.in/api/health` უნდა აბრუნებდეს `{"ok":true}` — და პროგრესი ავტომატურად დაიწყებს სინქრონს.

## შენიშვნები

- **მომხმარებლები**: `server.js`-ის `KNOWN_USERS` სინქრონში დაიცავი `computer-from-zero/auth.js`-ის `USERS`-თან (ახლის დამატებისას განაახლე ორივე).
- **ბექაფი**: `server/data/progress.db` — ერთადერთი მდგომარეობა; დროდადრო დააკოპირე.
- **პორტი**: შეცვლა `PORT` env-ით.
