# Wednesday Pauper Raid — Landing Page

A medieval-spellbook themed landing page for the Wednesday Pauper Raid at Raid'n'Trade Karlsruhe.

## Stack

Pure static site — no build step. React 18 + Babel Standalone are loaded from CDN at runtime, so the JSX files are served as-is.

- `index.html` — entry point (online build, fonts + React via CDN)
- `Pauper Raid Landing (offline).html` — self-contained single-file version (~1.5 MB) for offline use
- `pauper.css` — all styling
- `pauper-app.jsx` — main React component
- `pauper-ornaments.jsx` — decorative SVG components
- `tweaks-panel.jsx` — live tweaks panel (background / title style / flames)
- `foglioblasts.jpg` — background texture
- `artefacts/` — design references

## Local preview

Any static file server works. From the project root:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Hosting on GitHub Pages (free)

1. Create a new public repo on GitHub named `pauper-raid` (or anything you like).
2. Push this directory:
   ```bash
   git remote add origin https://github.com/<your-user>/pauper-raid.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
4. After ~1 minute the site will be live at `https://<your-user>.github.io/pauper-raid/`.

No GitHub Actions or build configuration is needed — Pages serves the files as-is.
