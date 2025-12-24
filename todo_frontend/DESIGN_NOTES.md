# Design Notes — Clean, Minimal UI

## Overview
This document captures the design principles, tokens, and component guidelines that shape the Todo Frontend. It is based on the current implementation and CSS tokens in src/App.css. The goal is a clean, restrained interface that is accessible, fast, and easy to extend.

## Design Principles and Rationale
- Clarity over decoration: Elements use neutral surfaces, clear hierarchy, and limited color accents for calls to action and feedback.
- Restraint and consistency: A compact spacing scale, shared border radius, and a small typography set create visual rhythm.
- Accessibility first: Contrast-aware themes, visible focus rings, proper aria labels, and reduced-motion support are built in.
- Performance and perceived speed: Short transition durations and CSS-only animations keep interactions snappy without distracting motion.
- Theming by tokens: All colors and core measurements are expressed as CSS custom properties to enable simple theme extension.

## Color Tokens and Usage
Defined via CSS custom properties on :root[data-theme='light'] and :root[data-theme='dark'].

Light theme
- --primary: #3b82f6
- --primary-hover: #2563eb
- --primary-ring: #dbeafe
- --success: #06b6d4
- --success-hover: #0891b2
- --error: #ef4444
- --error-weak: #fee2e2
- --text: #111827
- --text-muted: #6b7280
- --bg: #f9fafb
- --surface: #ffffff
- --surface-muted: #f3f4f6
- --border: #e5e7eb
- --divider: #e5e7eb

Dark theme
- --primary: #3b82f6
- --primary-hover: #60a5fa
- --primary-ring: rgba(59,130,246,.25)
- --success: #06b6d4
- --success-hover: #22d3ee
- --error: #f87171
- --error-weak: #3b0a0a
- --text: #f1f5f9
- --text-muted: #94a3b8
- --bg: #0f172a
- --surface: #1e293b
- --surface-muted: #334155
- --border: #334155
- --divider: #2b3a51

Usage rules
- Primary actions: --primary background with white text; hover uses --primary-hover; focus ring uses --primary-ring.
- Destructive actions: --error border and text; on hover, fill with --error and use white text.
- Informational surfaces: Cards, inputs, and neutral buttons use --surface with --border; hover may use --surface-muted.
- Text and meta: Body text uses --text; secondary/supporting text uses --text-muted.
- Dividers and outlines: Use --divider for container separators; use --border for component boundaries.

## Typography Scale and Font Choices
- System font stack for performance and legibility: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif.
- Base size: --font-base: 16px
- Scale:
  - --font-small: 13px (meta text, small controls)
  - --font-body: 16px (default)
  - --font-h3: 18px (mobile todo title)
  - --font-h2: 20px (todo title)
  - --font-h1: 26px (app title)
- Line heights and tracking:
  - --line-compact: 1.25 (titles)
  - --line-normal: 1.55 (body)
  - --letter-tight: -0.005em
  - --letter-normal: 0
  - --letter-wide: 0.01em
- Weight: 600 for action buttons and item titles; 700 for the app title.

## Spacing Rhythm and Layout Rules
- Spacing scale (4px base):
  - --space-1: 4px
  - --space-2: 8px
  - --space-3: 12px
  - --space-4: 16px
  - --space-5: 24px
  - --space-6: 32px
- Radii:
  - --radius-1: 6px (inputs, small buttons)
  - --radius-2: 10px (cards, toasts)
  - --radius-3: 14px (larger surfaces, rarely used)
- Layout:
  - Content max-width: 760px centered with grid gaps at --space-5.
  - Card padding: --space-4 to --space-5 range for clarity without bulk.
  - Header is sticky, with bottom divider using --divider.
- Responsive adjustments:
  - On <=768px, app title uses 24px; todo title uses --font-h3; card padding reduced slightly for tighter fit.

## Component Guidelines
### App Header
- Layout: Sticky header with .header-inner max-width of 760px and space-between alignment.
- Title: .app-title at --font-h1, font-weight 700, compact line height.
- ThemeToggle on the right; no subtitle (intentionally omitted to reduce visual noise).

### TodoInput
- Form container: .todo-input-form uses --surface, --border, and --radius-2 with --space-5 padding.
- Title input: .todo-input uses --radius-1 and strong focus styles with --primary border and --primary-ring shadow.
- Description: Optional .todo-description-input toggled with a simple text button; muted placeholder.
- Add button: .btn.btn-add uses --primary background and hover tokens; disabled state lowers opacity and disables pointer interactions.
- Error state: Apply .error to inputs to switch border to --error. Feedback is also visually conveyed via the Add button disabled state.

### TodoItem
- Card: .todo-item uses --surface with --border and --radius-2; hover subtly promotes border to --primary.
- Completed: .todo-item.completed uses --surface-muted background to indicate a completed state while keeping legibility.
- Checkbox: 20px size with accent-color set to --success; focus-visible ring uses --primary-ring.
- Content: Grid layout (checkbox + text). Title is .todo-title with --font-h2; description uses --text-muted.
- Actions: Right-aligned .todo-actions row using small buttons; destructive action styled with --error.

### ThemeToggle
- Minimal icon-only button at 36x36 with circular radius and subtle hover (surface-muted).
- Uses aria-label and title to announce the target theme.
- Focus-visible adds a --primary-ring outline.

## Interaction and Animation Guidelines
- Durations: --t-fast: 120ms; --t-normal: 180ms for page-level transitions. Keep interactions under 200ms.
- Easing: Use ease for color/background transitions; avoid large transforms to preserve minimalism.
- Loading indicators: Inline .spinner with 0.6s linear infinite rotation.
- Hover states: Prefer background or border color changes over scale transforms.
- Reduced motion: Respect prefers-reduced-motion; globally clamp animation and transition durations to 0.01ms and prevent looping.
- Exit/entrance: Keep structural motion minimal; brief opacity/border emphasis is preferred over translate/scale.

Note: While previous iterations included richer micro-interactions, the current approach is deliberately restrained to reduce visual noise and support focus.

## Accessibility Considerations
- Focus states: All focusable elements (.btn, inputs, ThemeToggle, checkbox) use box-shadow 0 0 0 3px with --primary-ring for visibility.
- Contrast: Text and surfaces are chosen for contrast in light and dark themes; avoid non-token colors.
- Labels and aria:
  - ThemeToggle uses aria-label and title describing the target theme.
  - TodoItem checkbox uses aria-label that describes the action in context: Mark "<title>" as complete/incomplete.
- Keyboard: All interactive elements are native or button elements; focus management relies on default tab order.
- Error feedback: Inputs use a visible error border; toast feedback supplements screen-level alerts.

## Theming Architecture and How to Extend
- Architecture:
  - Theme state is managed by ThemeContext (src/contexts/ThemeContext.js), persisting to localStorage and writing data-theme on the documentElement.
  - Tokens are defined at :root for base measurements and at :root[data-theme='light'|'dark'] for theme-specific colors.
  - Components only reference tokens (e.g., var(--surface)), never hard-coded colors, to ensure theme portability.
- Extending:
  1) Add a new theme by creating a selector block for :root[data-theme='your-theme'] in src/App.css.
  2) Define the full color set: --primary, --primary-hover, --primary-ring, --success, --success-hover, --error, --error-weak, --text, --text-muted, --bg, --surface, --surface-muted, --border, --divider.
  3) Update ThemeContext to allow toggling/cycling through additional theme names, or add a menu in ThemeToggle.
  4) Test contrast and focus ring visibility in the new theme; verify reduced-motion behavior.
- Do:
  - Keep token names consistent across themes.
  - Prefer adjusting colors in tokens rather than component-level overrides.
- Avoid:
  - Introducing non-token color values in components.
  - Using large motion or long-duration transitions that conflict with reduced-motion.

## Quick Reference (Actionable)
- Primary button: background var(--primary); hover var(--primary-hover); focus ring var(--primary-ring).
- Card surface: background var(--surface); border var(--border); radius var(--radius-2); padding var(--space-4 to --space-5).
- Input focus: border-color var(--primary) with ring var(--primary-ring).
- Completed item: add .completed to shift background to var(--surface-muted).
- Small controls: use --font-small and compact padding (--space-2 --space-3).
- Motion: keep <= 180ms; no scale/translate unless necessary; honor reduced motion.

## Sources
- src/App.css
- src/App.js
- src/components/TodoInput.js
- src/components/TodoItem.js
- src/components/ThemeToggle.js
- src/contexts/ThemeContext.js
