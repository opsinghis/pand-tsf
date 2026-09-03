# Journey Site

Interactive React version of `docs/agentic-fabric-journey.html`.

The source of truth is `src/data/journey.ts`. Edit the content there, then run:

```bash
npm run build:publish --workspace @pandav/journey-site
```

Useful commands:

```bash
npm run dev --workspace @pandav/journey-site
npm run build --workspace @pandav/journey-site
npm run test --workspace @pandav/journey-site
```

The build is intentionally single-file via `vite-plugin-singlefile` so it can be shared through the same static artifact path. Keep `dist/index.html` under 1.2 MB and avoid external images, fonts or scripts unless the distribution model changes.

## Structure

```
src/
  data/journey.ts       # ALL page content, typed — the spec for the smoke test
  components/           # one file per section + primitives.tsx (Section, Reveal,
                        # DataTable, FigureBox, em) — CSS co-located per component
  hooks/useScrollSpy.ts # IntersectionObserver scrollspy
  styles/               # tokens.css → base.css (shared) → responsive.css (last)
  App.tsx               # state + composition only
```

Conventions:
- All CSS is imported centrally in `main.tsx` (never in components) so the
  cascade order is explicit and the tsx-based SSR smoke can import `App`.
- Content strings support `**bold**` emphasis, rendered by `em()` in primitives.
- The smoke test is data-derived: every string ≥ 24 chars in `journey.ts` must
  appear in the SSR-rendered output, so deleted or unrendered content fails CI.
- The top nav groups the 15 sections into 5 chapters (`navChapters` in
  journey.ts); each chapter button opens a popover of numbered sections and a
  "now" indicator tracks the active section. Nav clicks write plain `#section`
  hashes and will overwrite `#lane/horizon` deep links; deep links are for
  sharing a specific lane + horizon view.
