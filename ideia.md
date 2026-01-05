You are a senior frontend engineer + UI designer. Build a mobile-first static web MVP for a hyperlocal food guide catalog named:

PROJECT_NAME: "Guia da Mesa"
CITY_LABEL: "Sena Madureira – AC"

Product concept:
- A curated local directory of places to eat (snack bars, cafés, restaurants).
- MVP is NOT a ranking, NOT delivery, NOT a social network.
- MVP is a fast, scannable catalog with category browsing and quick contact (WhatsApp + optional Instagram).
- Phase 2 (NOT in this MVP): place detail page with editorial review/critique and recommendations.

IMPORTANT CONSTRAINTS
- Mobile-first UX (most users on mobile).
- Static hosting on Netlify.
- No backend, no auth, no external API.
- Data stored locally as JSON; curator can add/edit places easily.
- “AI friendly” codebase: minimal indirection, no deep layers, no over-engineering.
- Feature-based folder structure (each feature self-contained: components, styles, data).
- Plain CSS (no Tailwind). Use CSS variables + small utility classes.
- Accessibility: semantic HTML, keyboard-friendly, good contrast.
- Performance: minimal JS, lazy loading images.

TECH STACK
Use Astro + TypeScript for static generation and SEO. Avoid React. Use minimal client-side JS only for search/filter interactions.

MVP PAGES / ROUTES
1) Home (/)
   - Top header with PROJECT_NAME and CITY_LABEL.
   - Search input (search by place name).
   - Filter chips row (horizontal scroll):
     - Category chips (Lanches, Pizza, Açaí, Almoço, Cafés, etc.)
     - Optional tag chips (e.g., "Bom e barato", "Família", "Rápido", "À noite") — keep it simple.
   - Primary browsing mode: categories as sections:
     - Each category section shows a small header with category name and count.
     - Under each category, show a list of cards (mobile: 1 column; larger screens: 2–4 columns).
   - Each card includes:
     - Square logo image (like iFood), consistent size (e.g., 72–88px square).
     - Place name
     - Category label
     - Optional tag badges (max 2)
     - Action buttons:
       - WhatsApp (primary)
       - Instagram (secondary, only if present)
   - Provide an empty state when search/filter returns no results.
   - Provide a small footer note: "Catálogo curado — informações podem mudar."

NO Place Detail Page in MVP
- Do NOT create /lugares/{slug}/ page in this version.
- Clicking a card should NOT navigate to detail; it can either do nothing or open a small lightweight modal with only contact info (optional). Keep it simple: prefer no modal.
- The only interactions needed are search/filter and external contact links.

DATA MODEL (local JSON)
Create: src/features/places/data/places.json
Fields per place:
- id: string (short unique)
- name: string
- categoryId: string
- tags?: string[] (tag slugs)
- logo: { src: string, alt: string }
- contact: { whatsapp: string, instagram?: string }
- updatedAt: "YYYY-MM-DD"

Create: src/features/taxonomy/data/categories.json
Example category fields:
- id: string
- name: string
- slug: string
- order: number

Create: src/features/taxonomy/data/tags.json (optional, but recommended for consistency)
- id: string (slug)
- name: string

IMAGE HANDLING
- Store logos in /public/images/logos/
- Use square assets; show them inside a rounded square container.
- Use lazy loading.
- Provide README instructions for adding and optimizing logos (recommend WebP if possible).

DESIGN DIRECTION (iFood-like structure, Michelin-like cleanliness)
- Layout: clean, lots of whitespace, calm borders, subtle shadows.
- Use chips for categories/tags (scrollable row).
- Use cards with consistent alignment, clear scanning.
- No pricing, no distance, no delivery time, no maps.
- Color palette: neutral base + one accent color (choose a tasteful accent). Use CSS variables.

FEATURE-BASED STRUCTURE (no layered architecture)
src/
  features/
    places/
      components/
        PlaceCard.astro
        PlaceList.astro
        CategorySection.astro
      data/
        places.json
      lib/
        groupByCategory.ts
        filterPlaces.ts
      styles/
        places.css
    taxonomy/
      data/
        categories.json
        tags.json
      lib/
        taxonomy.ts
      styles/
        taxonomy.css
    search/
      components/
        SearchBar.astro
        FilterChips.astro
      lib/
        queryState.ts (sync filters/search with URL query params)
      styles/
        search.css
  shared/
    styles/
      tokens.css
      base.css
    lib/
      strings.ts
public/
  images/
    logos/
netlify.toml
README.md

FUNCTIONAL REQUIREMENTS
- Search by name.
- Filter by:
  - selected category (single)
  - optional tags (multi-select) — if implemented, keep it basic.
- Sync state with URL query params:
  - q= (search)
  - cat= (category slug or id)
  - tags= (comma-separated slugs)
- Category sections should respect filtering:
  - When no category filter: show multiple category sections.
  - When category filter selected: show only that category section.
- If search/filter results are empty: show a friendly empty state + "Clear filters" action.

NETLIFY REQUIREMENTS
- Provide netlify.toml with correct build command and publish directory for Astro.
- Provide README: local dev, build, deploy.

CURATOR WORKFLOW (must be extremely easy)
- README: “How to add a new place”:
  1) Add logo file into /public/images/logos/
  2) Add entry into places.json (copy-paste template)
  3) Commit → Netlify auto-deploy
- Include seed data with at least 12 sample places (fake data ok).

SEO (basic but correct)
- Proper title and meta description for Home.
- Open Graph default image (generic), and social meta tags.

DELIVERABLE
Implement the complete working codebase.

Do not use Michelin brand assets or name. Only “Guia da Mesa”.
Keep the code concise, readable, and maintainable. Prioritize mobile experience.
