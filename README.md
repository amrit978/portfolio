# Amrit's Portfolio

A personal developer portfolio built with a terminal-inspired dark aesthetic (`#1A2028` background, `#E0A458` amber accents, `#9BA3AE` muted text). Built with vanilla HTML5, CSS3, and JavaScript — no frameworks, no external runtime dependencies, and no build step required.

**Live Site:** [amrit-theta.vercel.app](https://amrit-theta.vercel.app/)

---

## Sections

- **Hero (`~/`)**: Split two-line typographic introduction (`hi,` / `i'm amrit _`) with a blinking cursor and an interactive terminal coffee animation (`sudo wake-up --reason=coffee`).
- **About (`~/about.md`)**: Background as an engineering student, technical society leadership (devsoc), and systems development focus.
- **Skills (`~/skills`)**: Unboxed directory-style listing organized into `languages/`, `web/`, and `design/`.
- **Projects (`~/projects`)**: Split interactive showcase. The left column provides a directory navigation list (`01/`, `02/`, `03/`, `04/`), while the right column renders a live preview mockup window with real screenshots, taglines, tech pills, and GitHub repository links.
- **Contact (`~/contact`)**: Bold white tagline (*"Let's build something together"*), an infinite quotes rotator cycling through classic movie and gaming lines, direct contact action buttons (`get in touch` and `resume`), verified social links, and an animated 3D isometric cube model.
- **Footer**: Monospace terminal exit status (`amrit@portfolio:~$ exit 0`) with dynamic year stamping.

---

## Featured Projects

| Project | Tech Stack | Description |
| :--- | :--- | :--- |
| [**Pomodoro Timer**](https://github.com/amrit978/pomodoro-timer) | C++17 · Qt6 Widgets · CMake | Desktop productivity timer with session intervals, custom break limits, and native dark UI. |
| [**Wishfor**](https://github.com/amrit978/Wishfor) | Next.js 14 · TypeScript 5 · Tailwind CSS · Web Audio API · Node.js crypto | Anonymous peer sanctuary web app with zero identity exposure or tracking. |
| [**Tip Calculator**](https://github.com/amrit978/Tip-Calculator) | HTML5 · CSS3 · JavaScript | Real-time bill splitting calculator with custom tip percentage steppers and dark mode toggle. |
| [**Expense Tracker**](https://github.com/amrit978/Expense-Tracker) | Python · Flask · SQLite · Jinja2 · HTML5 · CSS3 | Personal finance tracking application with category breakdowns, running totals, and date filtering. |

---

## Architecture & Performance

- **Zero-Latency Showcase**: Project preview images are pre-rendered into stacked DOM layers and preloaded in `<head>`. Switching projects toggles GPU-accelerated opacity classes with **0ms delay**.
- **Modern Image Formats**: Preview screenshots are compressed to high-fidelity **WebP** files (~92 KB total across all 4 projects) with automatic PNG fallbacks.
- **Pure CSS Layout & Responsiveness**: Separate `app.css` (desktop architecture) and `responsive.css` (tablets, mobile reflow, animated hamburger navigation drawer, and touch targets).
- **Reduced Motion Support**: Respects `@media (prefers-reduced-motion: reduce)` by disabling non-essential transitions and keeping terminal content accessible.
- **SEO Ready**: Canonical URL, Open Graph metadata, semantic HTML, `sitemap.xml`, and `robots.txt`.

---

## Project Structure

```text
.
├── index.html            # Main markup with semantic sections & preloaded assets
├── app.css               # Core styling, layout, typography, and animations
├── responsive.css        # Responsive breakpoints (desktop, tablet, mobile)
├── script.js             # Showcase switching, quote rotator, loader & nav-spy
├── Favicon.svg           # Site favicon
├── robots.txt            # Search crawler directives
├── sitemap.xml           # Search engine sitemap
├── img/                  # Previews, screenshots, and vector graphics
│   ├── pomodoro-timer_preview.webp
│   ├── wishfor_preview.webp
│   ├── tipcalculator_preview.webp
│   ├── expensetracker_preview.webp
│   ├── og-image.png
│   └── ...
└── README.md
```

---

## Run Locally

No package installations or build steps are required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amrit978/Portfolio-main.git
   cd Portfolio-main
   ```

2. **Open in browser:**
   Double-click `index.html`, or serve using any static file server:
   ```bash
   # Using npx serve
   npx serve .

   # Or using Python
   python -m http.server 3000
   ```

---

## Deployment

The website deploys directly to [Vercel](https://vercel.com) (or any static hosting service like GitHub Pages, Netlify, or Cloudflare Pages):

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Select **Framework Preset** as `Other`.
4. Keep the build command and output directory empty.
5. Deploy. Every push to `main` triggers an automatic deployment.

---

## Contact

- **Email:** [itsmeamrit@proton.me](mailto:itsmeamrit@proton.me)
- **GitHub:** [@amrit978](https://github.com/amrit978)
- **LinkedIn:** [Amrit Kumar](https://www.linkedin.com/in/amrit-kumar-319780329/)
- **Instagram:** [@amrit_kuma_r](https://www.instagram.com/amrit_kuma_r)

---

## License

The code is open source and available under the [MIT License](LICENSE). Personal project texts, resume, and images remain copyrighted by Amrit Kumar.
