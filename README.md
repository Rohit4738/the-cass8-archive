# the-cass8-archive

A free, open-source in-game photography gallery. Host your screenshots like a museum — clean white walls, cinematic overlays, Lightroom edit previews, and full-quality downloads. Built to run entirely free on GitHub + JSONBin + Vercel.

---

## What it is

Two pages, one purpose:

- **Gallery** (`/`) — the public-facing museum. Visitors browse your photos, toggle quote overlays on/off, view your Lightroom edit screenshots, and download in original quality.
- **Admin** (`/admin`) — your private upload dashboard. Paste raw GitHub image URLs, add titles, write quote overlays (with position, font, colour), link edit screenshots, and publish to your gallery instantly.

Your images live in a separate GitHub repo. The image list lives in JSONBin. The site is hosted on Vercel. Nothing costs money. Nothing re-compresses your images.

---

## How it works

```
You push photos → GitHub (raw image hosting, original quality)
        ↓
Admin page → paste URLs, add metadata → saves to JSONBin
        ↓
Visitors open gallery → reads JSONBin → loads images from GitHub
```

---

## What you need (all free)

| Service | What for | Sign up |
|---|---|---|
| GitHub | Host image files + site code | github.com |
| JSONBin | Store image list as JSON | jsonbin.io |
| Vercel | Host the gallery and admin pages | vercel.com |

---

## Setting up your own gallery

### Step 1 — Create your repos

Create two public GitHub repositories:

- `gallery-aeterna` — the website code (this repo)
- `gallery-aeterna-photos` — your image and edit screenshot files

Inside your photos repo, structure it like this:

```
gallery-aeterna-photos/
├── photos/
│   ├── city-sunset.jpg
│   └── forest-path.jpg
└── edits/
    ├── city-sunset-lr.jpg
    └── forest-path-lr.jpg
```

Your raw image URLs will look like:

```
https://raw.githubusercontent.com/YOUR_USERNAME/gallery-aeterna-photos/main/photos/city-sunset.jpg
```

---

### Step 2 — Set up JSONBin

1. Go to [jsonbin.io](https://jsonbin.io) and create a free account
2. Click **Create Bin**
3. Paste this as the starting content and save:

```json
{ "images": [] }
```

4. Copy the **Bin ID** from the URL (looks like `64f3a2b...`)
5. Go to **API Keys** in your dashboard and copy your **Master Key** (starts with `$2b$...`)

Keep these — you'll need them in the next step.

---

### Step 3 — Deploy to Vercel

1. Fork this repository to your GitHub account
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import your forked `gallery-aeterna` repo
4. Before deploying, add these environment variables in Vercel's dashboard:

| Variable name | Value |
|---|---|
| `JSONBIN_KEY` | Your JSONBin Master Key |
| `JSONBIN_BIN_ID` | Your JSONBin Bin ID |

5. Click **Deploy**

Vercel gives you a free `yourname.vercel.app` URL. Every time you push code changes to GitHub, Vercel redeploys automatically in about 30 seconds.

> **Your API key is never in the code.** It lives only in Vercel's environment — private, even though your repo is public. Anyone who forks this project adds their own keys in their own Vercel dashboard.

---

### Step 4 — Open your Admin page

Go to `yoursite.vercel.app/admin`

You'll see the upload dashboard. From here you can:

- Paste one or more raw GitHub image URLs (one per line)
- Give each image a title
- Add a quote overlay — choose text, position (top-left, top-right, bottom-left, bottom-right, center, subtitle), font, and colour
- Link a Lightroom edit screenshot from your edits folder
- Tag images by game or series (used for filtering in the gallery)
- Hit **Publish** — images appear in the gallery instantly

---

## Image data structure

Each image is stored in JSONBin like this:

```json
{
  "id": "1720000000000",
  "title": "City at Dusk",
  "url": "https://raw.githubusercontent.com/.../photos/city-sunset.jpg",
  "game": "Cyberpunk 2077",
  "quote": "the city never sleeps",
  "quotePosition": "bottom-center",
  "quoteFont": "Georgia",
  "quoteColor": "#ffffff",
  "editUrl": "https://raw.githubusercontent.com/.../edits/city-sunset-lr.jpg"
}
```

All fields except `url` are optional. You can add images with just a URL and title if you want to keep it simple.

---

## Gallery features for visitors

- Browse all photos in a clean masonry grid
- Filter by game or series using tag chips
- Click any photo to open a full lightbox view
- Toggle quote overlay on or off per image
- View the Lightroom edit screenshot if one was added
- Download the image in original quality — with or without the quote overlay

---

## Image quality

Images are served directly from GitHub's raw file CDN. Nothing is re-encoded, resized, or compressed at any point. Visitors download the exact bytes you uploaded to GitHub.

---

## Project structure

```
gallery-aeterna/
├── index.html          ← public gallery page
├── admin/
│   └── index.html      ← admin upload page
└── api/
    └── save.js         ← Vercel serverless function (reads API key from env)
```

---

## Contributing

Pull requests are welcome. If you build something on top of Gallery Aeterna — a new overlay style, a different layout, theme support — feel free to open a PR or fork it your own way. That's the point.

---

## License

MIT — do whatever you want with it.
