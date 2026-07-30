// TSRE — პროგრესის მინი-backend (Node built-in http + node:sqlite, დამოკიდებულების გარეშე).
// გაშვება:  node server.js   (Node 22+; node:sqlite ჩაშენებულია)
// ინახავს სტუდენტების პროგრესს SQLite-ში და აწვდის ლექტორის დაფას.
//
// ⚠️ საკლასო ინსტრუმენტია — „honor system“ (ისევე, როგორც არსებული client-side login).
//    ჩაწერა userId-ით ხდება, პაროლის გადამოწმების გარეშე. სერიოზული უსაფრთხოება არ არის.

"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || "127.0.0.1";

// ცნობილი მომხმარებლები (სინქრონში დაიცავი auth.js-ის USERS-თან).
const KNOWN_USERS = ["davit", "elene", "natali"];
const KINDS = ["lessons", "assignments"];

// ---------- DB ----------
const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, "progress.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    user_id    TEXT NOT NULL,
    kind       TEXT NOT NULL,
    item_id    TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, kind, item_id)
  );
`);

const upsert = db.prepare(
  "INSERT OR REPLACE INTO progress (user_id, kind, item_id, updated_at) VALUES (?, ?, ?, ?)"
);
const remove = db.prepare("DELETE FROM progress WHERE user_id = ? AND kind = ? AND item_id = ?");
const selectAll = db.prepare("SELECT user_id, kind, item_id FROM progress");
const selectUser = db.prepare("SELECT user_id, kind, item_id FROM progress WHERE user_id = ?");

// ---------- helpers ----------
function emptyUser() {
  return { lessons: [], assignments: [] };
}
function rowsToUsers(rows) {
  const out = {};
  KNOWN_USERS.forEach(function (u) { out[u] = emptyUser(); });
  rows.forEach(function (r) {
    if (!out[r.user_id]) out[r.user_id] = emptyUser();
    if (KINDS.indexOf(r.kind) !== -1) out[r.user_id][r.kind].push(r.item_id);
  });
  return out;
}
function validId(s) {
  return typeof s === "string" && s.length > 0 && s.length <= 80 && /^[\w:-]+$/.test(s);
}

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  });
  res.end(json);
}

function readBody(req) {
  return new Promise(function (resolve, reject) {
    let data = "";
    let tooBig = false;
    req.on("data", function (chunk) {
      data += chunk;
      if (data.length > 1e6) { tooBig = true; req.destroy(); }
    });
    req.on("end", function () {
      if (tooBig) return reject(new Error("body too large"));
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(new Error("invalid JSON")); }
    });
    req.on("error", reject);
  });
}

// ---------- routes ----------
const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (req.method === "OPTIONS") return send(res, 204, {});

  // GET /api/health
  if (req.method === "GET" && pathname === "/api/health") {
    return send(res, 200, { ok: true, users: KNOWN_USERS.length });
  }

  // GET /api/progress  → ყველა (ლექტორის დაფა)
  if (req.method === "GET" && pathname === "/api/progress") {
    return send(res, 200, rowsToUsers(selectAll.all()));
  }

  // GET /api/progress/:userId  → ერთი (სტუდენტის ჩატვირთვა შესვლისას)
  const m = pathname.match(/^\/api\/progress\/([\w:-]+)$/);
  if (req.method === "GET" && m) {
    const uid = m[1];
    if (!validId(uid)) return send(res, 400, { error: "bad userId" });
    return send(res, 200, rowsToUsers(selectUser.all(uid))[uid] || emptyUser());
  }

  // POST /api/progress  {userId, kind, id, done}
  if (req.method === "POST" && pathname === "/api/progress") {
    let body;
    try { body = await readBody(req); }
    catch (e) { return send(res, 400, { error: e.message }); }

    const userId = body.userId;
    const kind = body.kind;
    const id = body.id;
    const done = body.done !== false;

    if (!validId(userId) || KNOWN_USERS.indexOf(userId) === -1) return send(res, 400, { error: "unknown userId" });
    if (KINDS.indexOf(kind) === -1) return send(res, 400, { error: "bad kind" });
    if (!validId(id)) return send(res, 400, { error: "bad id" });

    if (done) upsert.run(userId, kind, id, new Date().toISOString());
    else remove.run(userId, kind, id);

    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: "not found" });
});

server.listen(PORT, HOST, function () {
  console.log(`TSRE progress API → http://${HOST}:${PORT}  (DB: ${path.join(DATA_DIR, "progress.db")})`);
});
