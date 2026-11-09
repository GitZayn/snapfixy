# SnapFixy

**SnapFixy** (snapfixy.com) is a set of free online image and PDF tools with a
privacy-first design: every tool runs entirely in the visitor's browser, so
files are never uploaded to a server.

## Tools

| Tool | Path | How it works |
| --- | --- | --- |
| Background Remover | `/background-remover/` | AI cut-outs in the browser via `@imgly/background-removal` (ONNX model + WASM served from the IMG.LY CDN; the user's image never leaves the device) |
| Image Compressor | `/image-compressor/` | Canvas re-encode with a quality slider and before/after sizes |
| Image Converter | `/image-converter/` | PNG / JPG / WebP conversion via canvas |
| Image Resizer | `/image-resizer/` | Exact pixel resizing via canvas, with aspect-ratio lock and presets |
| PDF Merge | `/pdf-merge/` | Combines PDFs with `pdf-lib` in the browser |
| PDF Split | `/pdf-split/` | Extracts page ranges with `pdf-lib` |
| PDF Compressor | `/pdf-compressor/` | Re-saves with compressed object streams via `pdf-lib`; honest about its limits |

Plus a blog with practical guides, and About / Contact / Privacy Policy /
Terms pages.

## Tech

Plain HTML, CSS and JavaScript — no build step, no framework, no server code.
Shared styles live in `assets/css/style.css` and shared helpers in
`assets/js/main.js`. Each page is a self-contained `index.html` in its own
directory, so the site can be served by any static host.

## Develop

Serve the folder with any static file server, for example:

```sh
python3 -m http.server 8000
```

then open http://localhost:8000.

## Deploy

The site is hosted on Vercel as a static project linked to this repository;
pushes to `main` deploy automatically. Canonical URLs point at
https://snapfixy.com.

## Privacy note

No analytics or advertising code is included in this codebase yet. The tools
themselves never transmit user files anywhere.
