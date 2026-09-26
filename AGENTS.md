# AGENTS.md

Personal portfolio site for **Mugni Asfi Asfiya**. Static HTML/CSS/vanilla JS, all
user-facing copy in **Bahasa Indonesia** (`lang="id"`). No framework, no build,
no package manager, no tests, no linter, no CI.

## Repo shape

Repo root **is** the GitHub Pages deploy root (served from `main`). Keep all asset
paths relative (`style.css`, `img/...`, `assets/...`) — no leading `/`, or assets
break in production. There is no bundler, so filenames are referenced literally
from HTML; renaming a file means grepping for it.

- `index.html` — the only real page. Single-file, all sections inline (`#home`,
  `#about`, `#services`, `#skills`, `#education`, `#experience`, `#contact`).
- `script.js` — loaded **only** by `index.html`.
- `style.css` — shared by `index.html` *and* all detail pages.
- `img/` — terse names that are not guessable. `W` prefix = website screenshot:
  `Mugni.jpg` = profile photo, `WP` = Portofolio, `WSK` = SIAKAD Al-Manaar,
  `WEK` = e-katalog kenangansenja, `WFB` = Facebook clone, `WB` = Anime BNHA.
  Extensions are inconsistent and **case matters** — `WSK.PNG` is uppercase
  while the other new ones are lowercase `.png`.
- `assets/` — the CV PDF.

## Projects

Five projects, in this order in the `#experience` section. Each has a matching
detail page:

| Card heading | Image | Detail page | GitHub |
|---|---|---|---|
| Portofolio | `img/WP.jpg` | `portofolio.html` | real |
| SIAKAD Al-Manaar | `img/WSK.PNG` | `SIAKAD.html` | placeholder |
| Katalog Kopi | `img/WEK.png` | `kenangansenja.html` | placeholder |
| Facebook Clone | `img/WFB.png` | `facebook.html` | placeholder |
| Anime(BNHA) | `img/WB.jpg` | `animeBNHA.html` | real |

**Unfilled GitHub links are uppercase `REPO-*` placeholders** — the user fills
these in himself, so don't "helpfully" invent URLs. Grep for `REPO-` to find
them all. Two projects are already real: `webPortofolio` and `web_BNHA`.

The SIAKAD tech tags (`PHP`, `MySQL`, `Bootstrap 5`) were **inferred from a
screenshot, not confirmed by the user** — verify before treating them as fact.


## Verify changes

No build or test command exists. Open `index.html` in a browser (works over
`file://`; every asset is relative). If you need a server:
`python -m http.server 8000` from the repo root. Manual smoke check only: nav
toggle, typing animation, service modals, CV modal, contact form, back-to-top.

## Contact form

The form in `#contact` posts to **Web3Forms** (`https://api.web3forms.com/submit`)
and delivers to `mugi47044@gmail.com`. There is no backend — the repo is static.

- **`access_key` must be a UUID, and it is currently a placeholder.**
  The markup ships `00000000-0000-0000-0000-000000000000` and the submit handler
  bails out with a warning if it still starts with `00000000`. The real UUID comes
  from the user: web3forms.com → enter email → key is emailed to them. The old
  `md5(email)` convention is **dead** — the API rejects it with
  `Invalid form_id/access_key format. Must be a valid UUID.`
- **Response shape is `result.body.message`, not `result.message`.** Getting this
  wrong silently drops the server's error text.
- **Every input needs a `name` attribute, not just an `id`.** Web3Forms only reads
  named fields — the original markup had `id` only, so nothing would have been
  transmitted. Keep `name` and `id` in sync.
- Replies go back to the sender automatically because the form has a field named
  `email`; Web3Forms uses it as the reply-to address. No `replyto` field needed.
- Spam protection is a honeypot named `botcheck`, hidden with `display: none` as
  the API requires. The submit handler also returns early if it's filled.
- **`api.web3forms.com` sits behind a Cloudflare managed challenge.** Scripted
  requests (curl, `Invoke-RestMethod`, CI) get a 403 HTML challenge page — that
  is *not* a bad access key. Only a real browser clears it. That's why the
  `catch` block falls back to `contactForm.submit()`: a native POST is a real
  navigation, so delivery still succeeds if the AJAX call is challenged.
- Consequence: you cannot verify this endpoint from the CLI. Testing requires
  submitting the real form in a browser and checking the inbox.

## Services section

- The three cards live in `index.html`; their modal copy is the single
  `serviceData` object in the **first** `DOMContentLoaded` block. A duplicate
  copy used to exist in a second `DOMContentLoaded` block and has been deleted —
  there is now exactly one. Edit that one.
- `data-service` on each card is the key into `serviceData` (`web-development`,
  `ui-ux`, `data-analyst`). Keep the two in sync; a mismatch fails silently.
- Modal copy may include `<p class="modal-cta"><a href="#contact">…</a></p>`.
  Because it is injected with `innerHTML`, it is **not** covered by the
  smooth-scroll handler bound at `DOMContentLoaded`; a dedicated delegated
  listener on `#service-modal` closes the modal and then scrolls. Adding another
  in-modal anchor means relying on that listener, not adding a new one.


## Landmines in `script.js`

These are real and easy to trip over — read before editing.

- **The file is not defensive at top level.** Lines 2-5 do
  `document.querySelector('#menu-icon').onclick` with no null check. Adding
  `<script src="script.js">` to any page lacking the portfolio header **throws
  immediately**. The detail pages are header-less; do not add the script there
  without adding guards first.
- **`new Typed(...)` is unguarded and is the first statement** inside the big
  `DOMContentLoaded` block. If the unpkg CDN for `typed.js` fails (offline, CSP,
  blocked), everything *after* it in that block dies: service modals, contact
  form, smooth scroll, the IntersectionObserver reveal animations, and the
  `animationDelay` loop. `window.onscroll` / `load` / `resize` are registered
  outside the block and still work. Guard `new Typed` before anything else in
  that block.
- **Two separate `DOMContentLoaded` blocks.** The second one re-declares
  `serviceData` (a full copy of the first) that is then never read — dead code.
  Don't add a third copy or "fix" a `serviceData` in the wrong block; the live
  one is the **first** block (~line 78).
- **`.download-cv` has two competing click handlers.** The About-section
  "Unduh CV" button gets both the old fake-download `alert('... (Simulasi)')`
  (~line 210) *and* the CV-modal opener (~line 353). Expect a spurious
  simulation alert; the dead handler is safe to delete.
- **`fadeInUp` keyframes and the `.animate` class are injected by JS**, not
  present in `style.css`. Scroll-reveal styling lives at the bottom of
  `script.js`, not in the stylesheet.
- **CSS animations beat inline styles.** The IntersectionObserver adds
  `.animate` (with `forwards` fill) to `.service-box`, `.skill-category`,
  `.education-item`, `.experience-item` and `.info-item`, which pins their
  `transform`. So setting `el.style.transform` from JS on those cards silently
  does nothing. That's why the mouse spotlight writes `--mx` / `--my` custom
  properties instead of a transform — keep it that way.
- Smooth scroll uses a hardcoded `- 80` px offset, not `scroll-margin-top`.
- The last block in `script.js` is a deliberate standalone IIFE for the
  scroll-progress bar and the mouse spotlight. It is kept separate on purpose —
  do not fold it into the fragile `DOMContentLoaded` blocks, and do not add
  more unguarded top-level DOM queries at the end of the file (first bullet).

## Known broken things

Verified against the current tree — safe to fix, but don't mistake them for
your own regression.

- `index.html:2` is `< lang="id">` — the `html` is missing, so every other page
  has `<html lang="id">` and this one doesn't. Browsers recover silently.
- **The CV download is broken.** `index.html:53` and `index.html:316` point to
  `assets/CV_MugniAsfiAsfiya_(19-11-2025).pdf`, but the only file present is
  `assets/CV Mugni Asfi Asfiya (28-12-2025).pdf` (spaces, different date). If you
  repoint it, keep the real name — it needs URL-encoding for the spaces.

## Detail pages

`portofolio.html`, `SIAKAD.html`, `kenangansenja.html`, `facebook.html` and
`animeBNHA.html` are project detail pages. All are **untracked** in git — only
`index.html`, `script.js`, `style.css`, `img/`, `assets/` are committed.

- Each is linked from its `.experience-item` card in `index.html` twice: the
  image (`.project-media`) and the "Lihat Detail Projek" button (`.btn-project`).
  Adding a project means adding **both**, plus a matching entry in the
  `elementsToAnimate` selector in `script.js` if it should reveal on scroll.
- They link `style.css` and the Font Awesome CDN, but **no `script.js`**. Their
  styling lives in the `--- Halaman Detail Projek ---` block at the end of
  `style.css`, using classes that did not exist before: `.detail-page-body`,
  `.project-detail-container`, `.project-detail-card`, `.back-button`,
  `.project-hero-image`, `.project-header`, `.project-meta`, `.project-section`,
  `.tech-tags`, `.project-actions`, `.btn-github`.
- The three retired projects were `Absensi.html` (Visual Basic), `Kalkulator.html`,
  and `loginPage.html`; they were deleted along with their images when the user
  replaced them. Don't resurrect them.


## The enhancement block (end of `style.css`)

A single marked block at the bottom of `style.css` owns all the modern look:
aurora background, glass cards, mouse spotlight, project buttons, detail pages.
Prefer extending it over scattering new rules. Two contracts inside it:

- **z-index ladder.** `body::before` (aurora) and `body::after` (grid) are
  `position: fixed; z-index: 0`. Any new page-level content needs
  `position: relative; z-index: 1` or the aurora paints over it — this is why
  `section, .footer` and `.detail-page-body > *` are positioned. Ladder:
  `0` decor → `1` content → `1000` header → `1500` scroll bar → `2000` service
  modal → `3000` CV modal.
- **Never add `overflow: hidden` to `.education-item` / `.experience-item`.**
  Their `.education-dot` / `.experience-dot` sit at `-2.5rem` outside the card
  and will be clipped away. (`.project-media` and `.btn-project` do clip, safely.)


## Conventions

- Comments and UI strings are Indonesian or mixed ID/EN; match the surrounding
  file rather than switching languages mid-file.
- External deps are pinned by version: Font Awesome `6.7.2` (CDN, with SRI
  `integrity` + `crossorigin`) and `typed.js@2.1.0` (unpkg, **no** SRI). If you
  bump a version, update the SRI hash.
- Only branch is `main`; history is a single `first commit`. Remote is
  `github.com/Mugni120/webPortofolio`. No `.gitignore` — don't add build output,
  there's nothing to ignore.
