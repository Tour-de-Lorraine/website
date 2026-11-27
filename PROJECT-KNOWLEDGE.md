# Tour de Lorraine — Project Knowledge

## 1. Architecture

### Stack
- **Frontend:** SvelteKit 5 + adapter-static
- **Backend:** Directus 11.17.4 (SQLite, self-hosted container)
- **Hosting:** immerda.ch (SFTP webhosting, nginx → Apache when `.htaccess` enabled)
- **Sites:**
  - `www.tourdelorraine.ch.immer-da.ch` (static frontend)
  - `next.tourdelorraine.ch` (Directus API + admin panel)

### Problem Solved
Directus had **broken CORS** (405 on `OPTIONS` preflight to `/graphql`). This was fixed by adding CORS env vars to the Pod spec. CORS now works on all endpoints. **Build strategy:** Prerender ALL pages at build time (no client-side API calls needed for initial load).

---

## 2. Directus Backend (`next.tourdelorraine.ch`)

### SFTP
- **Host:** `ftp-7.glei.ch`
- **User:** `next.tourdelorraine.ch`
- **Password:** _(see password manager)_

### CORS Status (2026-11-13)

| Endpoint | Preflight (OPTIONS) | OPTIONS Status | Actual Request | CORS Headers | Status |
|---|---|---|---|---|---|
| `/graphql` | `204 No Content` | ✅ | `POST 200 ✅` | All present ✅ | ✅ **Working** |
| `/assets/*` | `204 No Content` | ✅ | `GET 200 ✅` | All present ✅ | ✅ **Working** |
| REST `/items/*` | `204 No Content` | ✅ | `GET 200 ✅` | All present ✅ | ✅ **Working** |

**Preflight response headers (all endpoints):**
```
access-control-allow-origin: http://www.tourdelorraine.ch.immer-da.ch
access-control-allow-credentials: true
access-control-allow-methods: GET,POST,PATCH,DELETE,OPTIONS
access-control-allow-headers: Content-Type,Authorization
access-control-max-age: 18000
access-control-expose-headers: Content-Range
```

### Key Files
| File | Purpose |
|------|---------|
| `private/container-config/pod-next.tourdelorraine.ch.yaml` | **Main config** — Pod spec with env vars |
| `private/container-config/tdl-directus-directus-backend.env` | Secondary env file (NOT used by container) |
| `data/directus/database/data.db` | SQLite database (16 MB) |
| `data/directus/uploads/` | File uploads |

### CORS Fix Applied
Added to `pod-next.tourdelorraine.ch.yaml` → `spec.containers[0].env`:
```yaml
- name: CORS_ENABLED
  value: "true"
- name: CORS_ORIGIN
  value: "true"
- name: CORS_METHODS
  value: "GET,POST,PATCH,DELETE,OPTIONS"
- name: CORS_ALLOWED_HEADERS
  value: "Content-Type,Authorization"
- name: CORS_CREDENTIALS
  value: "true"
- name: CORS_MAX_AGE
  value: "18000"
```

**Restart pod:** Create empty file `scripts/pod_restart/pod_restart.run`

### Directus API Token
- Stored in frontend `.env` as `PUBLIC_DIRECTUS_TOKEN`
- Also used by build scripts

### Current Directus Warnings (non-critical)
- `"SECRET" env variable is missing` — tokens won't persist across restarts
- `PUBLIC_URL` should be a full URL (currently `/data`)

---

## 3. Frontend Build System

### Prerendering Strategy
All pages fetched from Directus at **build time**, output as static HTML:
- 187 URLs auto-generated via `scripts/generate-prerender-entries.js`
- Root `+layout.js` has `export const prerender = true`
- Server endpoints (`sitemap.xml`, `robots.txt`) also prerendered

### Build Pipeline
```
npm run prebuild   → generate-prerender-entries.js (fetches 187 URLs from Directus)
npm run build      → vite build (prerenders all pages)
npm run postbuild  → generate-sitemap.js + postbuild-fix-dirs.js (creates sitemap.xml + robots.txt + fixes directory collisions)
```

### SvelteKit Config (`svelte.config.js`)
```js
adapter: adapter()                    // static adapter, no fallback
paths: { relative: false }           // absolute paths: /_app/... (not ./_app/...)
prerender: {
  entries: [...from prerender-entries.json],
  handleHttpError: ({path, message}) => { console.warn(...); return; }
}
```

### Key Files Modified
| File | Change |
|------|--------|
| `svelte.config.js` | Removed `fallback`, added `paths.relative: false`, dynamic prerender entries |
| `src/routes/+layout.js` | Added `export const prerender = true` |
| `src/routes/robots.txt/+server.js` | Added `export const prerender = true` |
| `src/routes/sitemap.xml/+server.js` | Added `export const prerender = true` |
| `src/lib/directus/index.js` | Browser uses `window.location.origin` (for proxy), SSR uses `PUBLIC_DIRECTUS_URL` |
| `src/lib/directus/assetUrl.js` | **NEW** — `getDirectusFileUrl(id)` prepends `https://next.tourdelorraine.ch/assets/` |
| `src/lib/components/objects/Picture.svelte` | Uses `getDirectusFileUrl()` |
| `src/lib/components/objects/Video.svelte` | Uses `getDirectusFileUrl()` for poster + video src |
| `src/lib/components/objects/DetailsList.svelte` | Uses `getDirectusFileUrl()` for PDF links |
| `src/lib/components/bits/Favicon.svelte` | Fixed apple-touch-icon path to `/assets/favicons/...` |

### Scripts Created
| Script | Purpose |
|--------|---------|
| `scripts/generate-prerender-entries.js` | Fetches all pages/editions/events from Directus → `prerender-entries.json` |
| `scripts/generate-sitemap.js` | Generates `sitemap.xml` + `robots.txt` in build dir |
| `scripts/postbuild-fix-dirs.js` | Converts colliding `.html` files (same name as directory) to `directory/index.html` |
| `scripts/backup-directus.sh` | Interactive DB backup with timestamp & rotation |

---

## 4. Deployment (`www.tourdelorraine.ch.immer-da.ch`)

### SFTP
- **Host:** `ftp-7.glei.ch`
- **User:** `tourdelorraine.ch`
- **Password:** _(see password manager)_
- **Remote dir:** `www/`

### .htaccess (handled via static/)
Stored in `static/.htaccess` (auto-copied to `build/` on every build):
```apache
RewriteEngine On

# Skip if request already ends in .html
RewriteCond %{REQUEST_URI} !\.html$

# Skip if request is a directory that already has an index.html
RewriteCond %{REQUEST_FILENAME} !-d

# Skip if the .html file doesn't actually exist
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}\.html -f

RewriteRule ^(.*)$ $1.html [L]
```

**Effect:** `/verein` → serves `/verein.html` if exists; skips directories with `index.html`.

### Handling same-name directories
SvelteKit generates both `programm.html` and `programm/event/...` sub-pages.
Post-build script converts colliding `.html` → `directory/index.html`:
```bash
node scripts/postbuild-fix-dirs.js
```

**Result:** `/programm` → 301 → `/programm/` → `programm/index.html` ✅

### Current Status
- `.htaccess` is stored in `static/.htaccess` for automatic inclusion in builds
- `postbuild-fix-dirs.js` runs after every build to resolve directory collisions
- Tested successfully in local Docker Apache container on port 8081
- Clean URLs (`/verein`, `/datenschutz`, `/programm`, `/archiv/2026`) work correctly

### Deploy Process
```bash
npm run build   # Generates build/ including .htaccess and fixed dirs
# Then upload build/ to remote www/
```

---

## 5. URL Routing & Structure

### Route Translations (`src/config/routes.js`)
| Route ID | German | English |
|----------|--------|---------|
| `current_edition` | `/programm` | `/events` |
| `association` | `/verein` | `/association` |
| `support` | `/projektfoerderung` | — |
| `archive` | `/archiv` | `/archive` |
| `contact` | `/kontakt` | — |
| `imprint` | `/impressum` | — |
| `privacy` | `/datenschutz` | — |

### Dynamic Routes
- `/programm/event/{slug}` — current edition events
- `/archiv/{year}` — past editions
- `/archiv/{year}/event/{slug}` — past edition events

### Root Redirect
`/` → `/programm` (via `index.html` meta refresh + JS redirect)

---

## 6. Backup Procedure

### Database Backup
```bash
bash scripts/backup-directus.sh
```
- Prompts for SFTP password interactively
- Saves to `backups/directus/data-YYYY-MM-DDTHH-MM-SS.db`
- Keeps 5 most recent backups (auto-deletes older ones)
- `backups/` is in `.gitignore` (local only)

### Config Backups On Server
| File | Backup |
|------|--------|
| `private/container-config/pod-next.tourdelorraine.ch.yaml` | `.BACKUP` |
| `private/container-config/tdl-directus-directus-backend.env` | `.BACKUP.2026-11-13T12-06-28-768Z` |

---

## 7. Testing & Verification

### CORS Check
```bash
curl -X OPTIONS "https://next.tourdelorraine.ch/graphql" \
  -H "Origin: http://www.tourdelorraine.ch.immer-da.ch" \
  -H "Access-Control-Request-Method: POST"
# Expected: HTTP/2 204 with access-control-* headers
```

### Static Assets
```bash
curl -s -o /dev/null -w "%{http_code}" \
  "https://next.tourdelorraine.ch/assets/{id}?key=vw-s"
# Expected: 200
```

### Prerender Quality Check
```bash
# Verify no relative _app paths (should be absolute)
grep -r 'href="\./_app' build/ && echo "FAIL" || echo "OK"

# Verify Directus assets use absolute URLs
grep -o 'https://next.tourdelorraine.ch/assets/[^"]*' build/programm/index.html | head -5
```

---

## 8. Troubleshooting

### 404 on `/verein`, `/programm`, etc.
**.htaccess not enabled.** Contact immerda:
> Betreff: .htaccess für Webhosting tourdelorraine.ch aktivieren
> 
> Hallo zusammen
> 
> Wir betreiben das Webhosting für die Domain **tourdelorraine.ch** bei euch (SFTP-User: `tourdelorraine.ch`). Für unser aktuelles Projekt brauchen wir kurzfristig `.htaccess` aktiviert, damit wir URL-Rewriting für statische HTML-Seiten einrichten können.
> 
> Könnt ihr `.htaccess` für unser Hosting freischalten?
> 
> Danke! Grüsse

### JS assets 404 from sub-pages
Caused by `paths.relative: true` (default). Fixed by setting `paths.relative: false` in `svelte.config.js`.

### Directus images 404
Caused by `/assets/{id}` resolving to static host instead of Directus. Fixed by using `getDirectusFileUrl()` utility which prepends `https://next.tourdelorraine.ch/assets/`.

### Build fails with "GraphQL validation error"
Check Directus is running and `PUBLIC_DIRECTUS_URL` / `PUBLIC_DIRECTUS_TOKEN` are correct in `.env`.

---

## 9. Remaining TODOs

1. [ ] **Enable `.htaccess`** — Email immerda (draft above)
2. [ ] **Fix Directus `SECRET` env var** — tokens don't persist across restarts
3. [ ] **Fix Directus `PUBLIC_URL`** — should be full URL `https://next.tourdelorraine.ch` not `/data`
4. [ ] **Verify full site after `.htaccess` enabled** — test `/verein`, `/programm`, `/archiv/2026`
5. [ ] **Consider upgrading Directus** — currently 11.17.4, latest is 12.6.1

---

## 10. File Reference

### Project Root
```
├── .env                          # Directus URL & token
├── .gitignore                    # Excludes: .env, node_modules, build, backups
├── svelte.config.js              # Static adapter, absolute paths, prerender config
├── package.json                  # prebuild/postbuild scripts
├── prerender-entries.json        # Auto-generated at build time
└── build/                        # Static output (deployed to remote www/)

├── scripts/
│   ├── backup-directus.sh        # Interactive DB backup
│   ├── generate-prerender-entries.js
│   ├── generate-sitemap.js
│   └── fix-html-dirs.js          # No longer used (.htaccess approach)

├── src/
│   ├── routes/                   # All routes with prerender=true
│   ├── lib/
│   │   ├── directus/
│   │   │   ├── index.js         # Client config (proxy-aware)
│   │   │   ├── assetUrl.js      # getDirectusFileUrl() utility
│   │   │   └── fetch*.js        # Data fetchers
│   │   └── components/
│   │       └── objects/
│   │           ├── Picture.svelte
│   │           ├── Video.svelte
│   │           └── DetailsList.svelte
│   └── config/routes.js         # Route translations (de/en)

└── backups/
    └── directus/
        └── data-*.db             # SQLite backups (gitignored)
```

---

*Last updated: 2026-11-13*
