# Design System Inspired by VertexEnd

## 1. Visual Theme & Atmosphere

VertexEnd's design system embodies a bold, forward-thinking aesthetic rooted in technology and innovation. The palette juxtaposes deep, sophisticated purples and navy tones against vibrant magenta and coral accents, creating dynamic visual tension that communicates both expertise and cutting-edge capability. The design philosophy balances minimalist layouts with high-contrast elements, establishing a professional yet energetic presence. Typography is clean and hierarchical, favoring generous whitespace to ensure clarity in complex software and AI-focused messaging. The system prioritizes accessibility and scalability, with careful attention to contrast ratios and responsive behavior across enterprise and consumer touchpoints.

**Key Characteristics**
- Bold, high-contrast color palette mixing deep purples with neon accents
- Clean, geometric layouts with deliberate negative space
- Enterprise-grade professionalism paired with contemporary energy
- Scalable typography system supporting varied content depths
- Strategic use of accent colors to draw attention to CTAs and key information
- Neutral backgrounds allowing content and imagery to dominate

## 2. Color Palette & Roles

### Primary
- **Orange** (`#eb4034`): Primary brand identity, hero sections, dominant backgrounds
- **Dark Navy** (`#101C57`): Secondary primary for dark mode, navigation, premium sections
- **Dark Purple** (`#39175B`): Tertiary primary, depth variation, accent overlays

### Accent Colors
- **Magenta** (`#FF6FFF`): Primary call-to-action, interactive highlights, vibrant CTAs
- **Hot Magenta** (`#FF9AFF`): Secondary accent, hover states, light accent variations
- **Coral** (`#FF6A47`): Tertiary accent, alerts, success indicators, emphasis elements
- **Soft Coral** (`#FF977E`): Muted accent, secondary CTAs, gentle highlights

### Interactive
- **Sky Blue** (`#53ABFC`): Links, secondary interactive states, informational highlights

### Neutral Scale
- **True Black** (`#000000`): Primary text, dominant typography, maximum contrast
- **Near Black** (`#29292B`): Secondary text, subtle backgrounds, muted UI elements
- **Dark Gray** (`#434345`): Tertiary text, disabled states, secondary information
- **Medium Gray** (`#C0BFBF`): Borders, dividers, input focus states
- **Light Gray** (`#D2D2D5`): Subtle borders, background tints
- **Lighter Gray** (`#E3E3E6`): Minimal borders, hover states on light surfaces
- **Off White** (`#EBEBED`): Background tints, subtle card elevations

### Surface & Borders
- **White** (`#FFFFFF`): Primary surface, card backgrounds, contrast layers
- **Near Black Surfaces** (`#29292B`): Dark mode surfaces, deep backgrounds
- **Border Gray** (`#C0BFBF`): Default borders, form input borders
- **Subtle Border** (`#D2D2D5`): Minimal dividers, secondary borders

## 3. Typography Rules

### Font Family
- **Primary:** AeonikProVariableFont, Roboto, sans-serif
- **Fallback Stack:** `"AeonikProVariableFont", "Roboto", "Google Sans", sans-serif`
- **Secondary:** sans-serif (system fonts for performance)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Large | AeonikProVariableFont | 66px | 400 | 76px | Normal | Hero headlines, page titles |
| Display Medium | AeonikProVariableFont | 53px | 500 | 61px | Normal | Section headers, large CTAs |
| Heading 2 | AeonikProVariableFont | 42px | 500 | 49px | Normal | Major section breaks |
| Heading 3 | AeonikProVariableFont | 22px | 500 | 29px | Normal | Subsection headers, card titles |
| Body Large | AeonikProVariableFont | 34px | 500 | 44px | Normal | Featured body text, quotes |
| Body | AeonikProVariableFont | 18px | 300 | 26px | Normal | Primary body copy, descriptions |
| Body Compact | sans-serif | 15px | 400 | 24px | Normal | Secondary body, fine print |
| Span/Emphasis | AeonikProVariableFont | 15px | 400 | 22px | Normal | Inline emphasis, metadata |
| Link | AeonikProVariableFont | 16px | 400 | Normal | Normal | Navigation links, text links |
| Button | AeonikProVariableFont | 13px | 400 | Normal | Normal | Button labels, control text |
| List Item | AeonikProVariableFont | 15px | 300 | 22px | Normal | Bulleted/numbered lists |

### Principles
- Hierarchy is established through size and weight rather than color alone
- Line height maintains 1.4–1.5× line length for comfortable reading
- Body text defaults to 300–400 weight for optimal legibility
- Headings use 500 weight to establish clear visual hierarchy
- Letter spacing remains consistent at tracking value of 0 for professional appearance
- Font family choice supports both display and functional typography needs

## 4. Component Stylings

### Buttons

#### Primary Button (Filled, Magenta)
- **Background:** `#FF6FFF`
- **Text Color:** `#000000`
- **Padding:** `66px 29px`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Font Family:** AeonikProVariableFont
- **Border Radius:** `0px`
- **Border:** None
- **Line Height:** Normal
- **Hover State:** Opacity `0.85`, slight scale increase
- **Active State:** Opacity `0.7`
- **Min Width:** `220px`
- **Height:** Auto, min `52px`

#### Primary Button (Rounded)
- **Background:** `#FF6FFF`
- **Text Color:** `#000000`
- **Width:** `22px`
- **Height:** `22px`
- **Padding:** `0px`
- **Border Radius:** `50%`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Font Family:** AeonikProVariableFont
- **Border:** None
- **Hover State:** Opacity `0.85`
- **Use Case:** Icon buttons, floating action buttons

#### Secondary Button (Dark)
- **Background:** `#29292B`
- **Text Color:** `#FFFFFF`
- **Padding:** `15px 24px`
- **Font Size:** `15px`
- **Font Weight:** `400` or `500`
- **Font Family:** sans-serif
- **Border Radius:** `0px`
- **Border:** None
- **Line Height:** `24px`
- **Hover State:** Background opacity `0.85`, slight background lightening
- **Active State:** Background `#434345`
- **Box Shadow:** None

#### Ghost Button
- **Background:** Transparent
- **Text Color:** `#FF6FFF` or `#000000` (context-dependent)
- **Padding:** `12px 16px`
- **Font Size:** `15px`
- **Font Weight:** `400`
- **Font Family:** sans-serif
- **Border:** `2px solid` (color matches text)
- **Border Radius:** `0px`
- **Hover State:** Background fades to `rgba(255, 111, 255, 0.1)` or `rgba(0, 0, 0, 0.05)`
- **Active State:** Border solidifies, background opacity increases

### Cards & Containers

#### Card Default (Dark Background)
- **Background:** `#29292B`
- **Text Color:** `#FFFFFF`
- **Padding:** `23px 0px`
- **Border Radius:** `0px`
- **Border:** None
- **Box Shadow:** None
- **Font Size:** `15px`
- **Font Weight:** `400`
- **Font Family:** sans-serif
- **Line Height:** `24px`
- **Margin Bottom:** `32px`

#### Card Elevated (Light Background)
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Padding:** `24px 28px`
- **Border Radius:** `0px`
- **Border:** `1px solid #D2D2D5`
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 2px 8px`
- **Font Size:** `15px`
- **Font Weight:** `400`
- **Font Family:** sans-serif
- **Line Height:** `24px`
- **Hover State:** Border color `#C0BFBF`, shadow strengthens to `rgba(0, 0, 0, 0.15) 0px 4px 12px`

#### Card Accent (Magenta Background)
- **Background:** `#FF6FFF`
- **Text Color:** `#000000`
- **Padding:** `44px 28px`
- **Border Radius:** `0px`
- **Border:** None
- **Box Shadow:** None
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** AeonikProVariableFont
- **Line Height:** Normal
- **Heading Color:** `#000000` (bold weight `500`)

### Inputs & Forms

#### Text Input
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Border:** `2px inset #767676`
- **Padding:** `12px 16px`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Font Family:** AeonikProVariableFont
- **Border Radius:** `0px`
- **Line Height:** Normal
- **Focus State:** Border `2px solid #53ABFC`, outline none
- **Placeholder Color:** `#C0BFBF`
- **Disabled State:** Background `#E3E3E6`, text color `#434345`, border `2px solid #D2D2D5`

#### Select Input
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Border:** `2px inset #767676`
- **Padding:** `12px 16px`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Font Family:** AeonikProVariableFont
- **Border Radius:** `0px`
- **Line Height:** Normal
- **Focus State:** Border `2px solid #53ABFC`
- **Dropdown Indicator Color:** `#434345`

#### Label
- **Font Size:** `13px`
- **Font Weight:** `500`
- **Font Family:** AeonikProVariableFont
- **Color:** `#000000`
- **Margin Bottom:** `8px`
- **Display:** Block

### Navigation

#### Navigation Bar (Primary)
- **Background:** `#29292B` or `#FFFFFF` (variant)
- **Height:** `64px` (logo area)
- **Padding:** `16px 24px`
- **Border Bottom:** `1px solid #D2D2D5` (light variant only)
- **Box Shadow:** None

#### Navigation Link
- **Text Color:** `#000000` (dark background) or `#29292B` (light background)
- **Font Size:** `15px`
- **Font Weight:** `400`
- **Font Family:** sans-serif
- **Padding:** `15px 15px`
- **Line Height:** `24px`
- **Background:** Transparent
- **Border Radius:** `0px`
- **Hover State:** Background `rgba(0, 0, 0, 0.08)` or `rgba(255, 111, 255, 0.1)`
- **Active State:** Text color `#FF6FFF`, font weight `500`

#### Dropdown Menu (Nested)
- **Background:** `#FFFFFF`
- **Border:** `1px solid #D2D2D5`
- **Border Radius:** `0px`
- **Padding:** `8px 0px`
- **Box Shadow:** `rgba(0, 0, 0, 0.2) 0px 4px 12px`
- **Min Width:** `200px`

#### Mobile Navigation (Hamburger Menu)
- **Trigger Icon Size:** `24px`
- **Trigger Background:** Transparent
- **Trigger Border:** None
- **Text Color:** `#000000` or `#FFFFFF`
- **Overlay Background:** `rgba(0, 0, 0, 0.95)`
- **Menu Padding:** `20px 24px`

### Badges & Status Indicators

#### Success Badge (Checkmark)
- **Background:** `#FF977E` or `#FF6A47` (soft/strong variants)
- **Text Color:** `#29292B`
- **Padding:** `8px 12px`
- **Font Size:** `13px`
- **Font Weight:** `500`
- **Border Radius:** `4px`
- **Icon Size:** `16px`
- **Icon Color:** `#29292B`

#### Alert Badge
- **Background:** `#FF6A47`
- **Text Color:** `#FFFFFF`
- **Padding:** `8px 12px`
- **Font Size:** `13px`
- **Font Weight:** `500`
- **Border Radius:** `2px`

### Tabs

#### Tab Navigation
- **Background:** Transparent or `#EBEBED`
- **Border Bottom:** `2px solid #D2D2D5`
- **Height:** `44px`
- **Padding:** `0px`

#### Tab Item (Inactive)
- **Text Color:** `#434345`
- **Font Size:** `15px`
- **Font Weight:** `400`
- **Padding:** `12px 20px`
- **Background:** Transparent
- **Border Bottom:** `2px solid transparent`
- **Hover State:** Text color `#000000`, background `rgba(0, 0, 0, 0.04)`

#### Tab Item (Active)
- **Text Color:** `#000000`
- **Font Size:** `15px`
- **Font Weight:** `500`
- **Padding:** `12px 20px`
- **Background:** Transparent
- **Border Bottom:** `2px solid #FF6FFF`

## 5. Layout Principles

### Spacing System

The spacing system is built on an 8px base unit, providing a scalable, predictable rhythm across all layouts.

- **xs:** `4px` (minimal spacing between inline elements)
- **sm:** `8px` (tight spacing, form labels, small gaps)
- **md:** `12px` (default spacing between controls)
- **lg:** `16px` (standard padding, moderate gaps)
- **xl:** `20px` (generous spacing, section breaks)
- **2xl:** `24px` (container padding, larger gaps)
- **3xl:** `28px` (section padding)
- **4xl:** `32px` (major spacing between sections)
- **5xl:** `44px` (large padding, hero sections)
- **6xl:** `52px` (oversized padding, featured areas)
- **7xl:** `56px` (maximum padding, full-width sections)
- **8xl:** `68px` (hero-scale padding, landing page sections)

**Usage Context:**
- `4px–8px`: Form elements, tight lists, icon spacing
- `12px–16px`: Button padding, card padding, default component spacing
- `20px–28px`: Section padding, standard container padding
- `32px–56px`: Between major sections, full-width blocks
- `68px+`: Hero sections, full-screen blocks, premium white space

### Grid & Container

- **Max Width:** `1200px` (primary content container)
- **Columns:** 12-column grid system
- **Column Gap:** `16px` (standard), `24px` (generous)
- **Row Gap:** `24px` (default), `32px` (large sections)
- **Container Padding:** `24px` (mobile), `32px` (tablet), `44px` (desktop)
- **Section Padding:** `44px 0px` (vertical), `24px` (horizontal, mobile)

**Container Strategy:**
- Full-width hero sections with internal 1200px max-width alignment
- Two-column layouts for content + imagery (60/40 or 50/50 splits)
- Three-column grids for feature cards
- Fluid 1-2-3 column collapse for responsive adaptation

### Whitespace Philosophy

Whitespace is used deliberately to establish visual hierarchy, breathing room, and content focus. The system prioritizes clarity over density, allowing negative space to guide users through complex information hierarchies. Large vertical spacing (`44px–68px`) between major sections creates distinct content zones. Horizontal padding increases with viewport width, ensuring mobile screens remain scannable while desktop layouts breathe. Internal element spacing remains consistent, preventing visual chaos.

### Border Radius Scale

- **none:** `0px` (primary default, sharp corners for tech aesthetic)
- **xs:** `2px` (minimal softness, badges, small alerts)
- **sm:** `4px` (subtle rounding, secondary cards)
- **md:** `6px` (moderate rounding, inputs, optional use)
- **lg:** `8px` (generous rounding, premium cards)
- **full:** `50%` (circular, icon buttons, avatars)

**Context:**
- Primary components (buttons, cards, inputs) use `0px` radius
- Badges and small UI elements use `2px–4px`
- Rounded icon buttons use `50%`
- Hover/active states may add subtle rounding for warmth

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None | No shadow, flat surface | Buttons, primary cards, backgrounds |
| Subtle | `rgba(0, 0, 0, 0.1) 0px 2px 8px` | Hovered cards, input fields |
| Standard | `rgba(0, 0, 0, 0.15) 0px 4px 12px` | Floating panels, dropdowns, modals |
| Deep | `rgba(0, 0, 0, 0.2) 0px 8px 16px` | Modal overlays, expanded dropdowns, premium overlays |
| Extreme | `rgba(0, 0, 0, 0.3) 0px 1px 4px -1px` (detail layer) | Sub-layers, detail emphasis |

**Shadow Philosophy:**

The design system employs minimal, purpose-driven shadows that enhance depth perception without overwhelming the flat, clean aesthetic. Shadows are reserved for interactive surfaces that move or elevate (dropdowns, modals, floating panels), maintaining visual clarity on static content. All shadows use black with reduced opacity to ensure compatibility across light and dark modes. Elevation increases only when functional layering is necessary—typically during hover, focus, or modal states. This restrained approach maintains the system's contemporary, tech-forward aesthetic while supporting cognitive load reduction through clear spatial hierarchies.

## 7. Do's and Don'ts

### Do
- Use the primary accent color (`#FF6FFF`) for all critical call-to-action buttons
- Maintain high contrast between text and background; verify WCAG AA compliance (minimum 4.5:1 for body text)
- Build spacing in multiples of `8px` for consistency and predictability
- Place magenta accents strategically to guide user attention without overuse
- Use `0px` border radius on primary components to maintain the tech-forward aesthetic
- Implement responsive typography that scales proportionally across breakpoints
- Ensure touch targets meet minimum `44px` × `44px` size on mobile devices
- Layer deep purples (`#52002D`, `#101C57`) for visual depth and hierarchy
- Maintain clear visual distinction between interactive and non-interactive elements
- Support dark and light mode variants with adequate contrast ratios

### Don't
- Avoid overusing bright accent colors; reserve them for high-priority interactions
- Don't reduce font size below `13px` for body copy or navigation
- Avoid rounded corners on primary buttons and cards—maintain `0px` radius
- Don't apply multiple shadows to a single element; select one elevation level
- Avoid nesting more than three levels of interactive components
- Don't use color alone to convey meaning; pair with icons or text labels
- Avoid low-contrast text pairs (light gray on white, dark text on deep purple)
- Don't apply animations longer than `300ms` for micro-interactions
- Avoid excessive padding that leaves content isolated; use intentional spacing
- Don't change semantic colors arbitrarily; maintain consistency across implementations

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | `0px–640px` | Single column, max 24px padding, font sizes reduce by 10–15%, touch targets `44px` × `44px` |
| Tablet | `641px–1024px` | Two columns, 28px padding, standard font sizes, increased spacing `24px–32px` |
| Desktop | `1025px–1440px` | Three columns (or two wide), 44px padding, full typography scale, spacing `32px–52px` |
| Large Desktop | `1441px+` | Four columns (content-dependent), 52px+ padding, generous spacing, full-scale effects |

**Implementation Details:**
- Typography hierarchy remains intact across all breakpoints; size reduces only on mobile
- Line heights increase slightly on smaller screens (`26px` → `28px` on mobile)
- Container max-width remains `1200px` to prevent excessive line length
- Padding scales: mobile `16px–24px`, tablet `24px–32px`, desktop `32px–52px`
- Margins increase from `24px` (mobile) to `56px–68px` (desktop)
- Multi-column grids collapse to single column on mobile, two columns on tablet

### Touch Targets

- **Minimum Size:** `44px` × `44px` (all interactive elements on touch devices)
- **Recommended Size:** `48px` × `48px` (buttons, navigation links)
- **Minimum Spacing:** `8px` between adjacent touch targets (to prevent mis-taps)
- **Cursor Area:** Desktop click targets can be smaller (`32px` × `32px`), but hover states must activate reliably
- **Icon Size:** `16px–24px` (scale to fit touch target boundaries)
- **Padding Around Text Links:** Minimum `4px` horizontal, `2px` vertical

### Collapsing Strategy

- **Navigation:** Desktop horizontal menu bar collapses to hamburger menu on tablets; opens as full-screen overlay on mobile
- **Multi-Column Grids:** Three columns (desktop) → two columns (tablet) → one column (mobile)
- **Sidebars:** Desktop aside panels collapse into flyout drawers on tablets; hide or drawer on mobile
- **Typography:** Display sizes reduce on mobile (Display Large: `66px` → `42px`; Display Medium: `53px` → `36px`)
- **Padding & Margins:** Scale down by 20–30% on mobile; increase by 20% on large desktop
- **Images:** Flexible width, responsive height; `max-width: 100%`
- **Forms:** Single-column on mobile/tablet; multi-column on desktop if appropriate
- **Modals & Overlays:** Full-screen on mobile; centered card with padding on tablet/desktop
- **Spacing:** `44px` vertical sections compress to `32px` on mobile; `68px` compress to `44px`

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Magenta (`#FF6FFF`) — all high-priority actions
- **Primary Background:** Deep Purple (`#52002D`) or Dark Navy (`#101C57`) — hero, dominant sections
- **Secondary CTA:** Hot Magenta (`#FF9AFF`) — hover/secondary actions
- **Tertiary Accent:** Coral (`#FF6A47`) — alerts, success, emphasis
- **Background (Light):** White (`#FFFFFF`) — default surface
- **Background (Dark):** Near Black (`#29292B`) — secondary surfaces, dark mode
- **Text (Primary):** True Black (`#000000`) — headings, body on light surfaces
- **Text (Secondary):** Near Black (`#29292B`) — secondary text on light surfaces
- **Text (Inverse):** White (`#FFFFFF`) — headings/body on dark surfaces
- **Border:** Medium Gray (`#C0BFBF`) or Light Gray (`#D2D2D5`) — default dividers
- **Link:** Sky Blue (`#53ABFC`) — secondary interactive elements
- **Disabled/Muted:** Dark Gray (`#434345`) or Light Gray (`#E3E3E6`)

### Iteration Guide

1. **Establish contrast:** All text must meet WCAG AA (`4.5:1` minimum); use black on light, white on dark
2. **Apply spacing in 8px increments:** Padding and margins scale by multiples of 8; no arbitrary values
3. **Reserve magenta for CTAs:** Every primary call-to-action uses `#FF6FFF`; secondary actions use `#29292B` or ghost variants
4. **Maintain 0px radius on primary components:** Buttons, cards, inputs use sharp corners; only icon buttons use `50%` radius
5. **Scale typography proportionally:** Mobile reduces Display sizes by 20%; tablet reduces by 10%; desktop remains full size
6. **Layer deep purples for hierarchy:** Use `#52002D` for dominant areas, `#39175B` for depth variation, `#101C57` for secondary tiers
7. **Implement shadow only on interactive surfaces:** Dropdowns, modals, and hover states receive shadows; static cards remain flat
8. **Touch targets minimum 44px:** All clickable elements on mobile must exceed this threshold; space between targets ≥8px
9. **Use semantic colors consistently:** Status indicators always use Coral (`#FF6A47`), links always use Sky Blue (`#53ABFC`)
10. **Collapse grids responsively:** 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile); adjust padding to scale 16px–44px