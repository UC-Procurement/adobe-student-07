# Copilot Instructions — adobe-student-07

Purpose: Help AI coding agents become productive quickly in this small static site repo.

Quick summary
- This is a vanilla HTML/CSS/JS static site (no build system). Primary files: `index.html`, `compare.html`, `faq.html`, `getdeal.html`, `contact.html`, `styles.css`, `script.js`, and `assets/`.
- Forms post to `process_contact.php` — there's a small server-side endpoint for contact form processing; treat it as a black-box server integration unless asked to change it.

What to know up front
- No package manager, bundler, or tests. Changes are validated by opening the HTML files in a browser.
- The site is mobile-first and accessibility-focused (skip link, ARIA attributes, keyboard handling). Preserve these patterns when editing interactive code.
- CSS follows a BEM-like convention and uses CSS custom properties declared in `styles.css`.
- `script.js` holds all client-side JS (menu toggle, FAQ accordion, form validation). Keep behavior centralized there unless adding a new feature that requires a new module file.

Key files to reference
- `index.html` — main layout, examples of markup, hero, pricing cards, and footer (copyright year is hardcoded in footer).
- `styles.css` — design tokens (`:root`), breakpoints, and component styles.
- `script.js` — navigation toggle, FAQ accordion, form handling, focus management and keyboard interactions.
- `process_contact.php` — server-side handler for the contact form; do not assume a framework.
- `getdeal.html` — contains SSO/action links and is where students redeem the deal; changes here affect the main CTA flow.

Patterns and conventions
- Keep changes minimal and focused. This repo intentionally avoids complex abstractions.
- Interactive behavior is implemented via direct DOM manipulation in `script.js`. When modifying behavior:
  - Reuse existing helper patterns (query selectors, ARIA toggles, class-based show/hide).
  - Respect existing focus management and escape key handling (used for mobile menu and FAQ).
- Styling:
  - Use CSS variables in `styles.css` for colors and spacing.
  - Follow existing component class names; avoid mass renaming.
- Accessibility:
  - Maintain `aria-expanded`, `aria-controls`, and `role` attributes already in the markup.
  - Preserve `skip-nav` and keyboard interactions for menus and accordions.

Developer workflows
- No build step — to test changes: open `index.html` (or the page you edited) in a browser or use a simple static server like `python -m http.server` from the repository root.
- To test form submission, a PHP-capable local server is required (e.g., `php -S localhost:8000`). The contact form posts to `process_contact.php`.

Examples of repository-specific edits
- Updating color tokens: edit `:root` variables in `styles.css` (see README example).
- Adding an FAQ item: edit `faq.html` and ensure the corresponding DOM behavior in `script.js` supports keyboard navigation.
- Changing CTA behavior: update `getdeal.html` and update any related event listeners in `script.js`.

Safety and boundaries
- Do not introduce external build tools or frameworks without user consent — this project intentionally stays dependency-free.
- Avoid removing or changing server-side endpoints (like `process_contact.php`) unless the user requests backend changes.

When in doubt
- Ask the user whether they want to keep the repo dependency-free and static before introducing a build step or installing packages.
- Run the site locally via a static server and verify UI and accessibility behavior manually.

Questions for the repo owner
- Should copyright year in the footer be automated?
- Is `process_contact.php` expected to be modified or replaced with a third-party form integration?

If anything here is unclear or you'd like me to expand examples, tell me which parts to clarify.