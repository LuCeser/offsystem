# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a static personal blog built with vanilla HTML/CSS/JavaScript, featuring a modern responsive design inspired by The New York Times and Apple's design philosophy.

### Content Structure

The blog is organized into three main sections:
- **编内** (Inside): Technical articles about software engineering and system architecture
- **编外** (Outside): Thoughts on technology, learning methods, and broader perspectives
- **周刊** (Weekly): Weekly journal entries with curated content and personal insights

### File Organization

```
myBlog/
├── index.html                 # Homepage with collection overview
├── collection/                # Section landing pages with dynamic stats
│   ├── inside.html           # Technical articles section
│   ├── outside.html          # Non-technical articles section
│   └── weekly.html           # Weekly journal section
├── articles/                  # Individual article pages
│   ├── weekly-journal-vol*.html  # Weekly journal entries
│   └── [topic-article].html      # Standalone articles
├── tags.html                  # Tag overview page
├── tag.html                   # Dynamic tag filtering page
├── about.html                 # About page
├── css/                       # Modular CSS architecture
│   ├── base.css              # CSS variables, base styles
│   ├── typography.css        # Font system and text styling
│   ├── layout.css            # Grid layouts and page structure
│   └── components.css        # Reusable UI components
└── js/main.js                # Interactive features
```

## Development Commands

Since this is a static site, no build process is required. Use a local server for development:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Content Management

### Adding New Articles

1. Create new HTML file in `articles/` directory
2. Use existing articles as templates for structure
3. Include reading time in article metadata (calculated at 400 Chinese characters/minute)
4. Add relevant tags in `<div class="article-tags">`
5. Update appropriate collection page if needed

### Weekly Journal Creation

Weekly journals follow this pattern:
- File naming: `weekly-journal-vol[YYYY]W[WW].html` (e.g., `weekly-journal-vol2025W46.html`)
- Include weekly badge with volume and date
- Structure content with multiple h2 sections
- Add 5 relevant tags for categorization

### File Naming Standards

**Consistent naming convention is crucial for proper organization:**

#### Weekly Journals
- Format: `weekly-journal-vol[YYYY]W[WW].html`
- Examples:
  - `weekly-journal-vol2025W46.html` (2025年第46周)
  - `weekly-journal-vol2024W52.html` (2024年第52周)

#### Standalone Articles
- Format: `[topic-name].html` (lowercase, hyphens for spaces)
- Examples:
  - `mitm-attack-analysis.html`
  - `chatgpt-learning-methods.html`

**Important Notes:**
- Always use 4-digit year (e.g., `2025`, not `25`)
- Week numbers should be zero-padded when necessary (e.g., `W01`, `W02`, ..., `W46`)
- Maintain consistent naming across all files for proper indexing
- Avoid special characters and spaces in filenames

### Tag Management

The blog uses a dynamic tag system:
- `tags.html` shows all tags with real article counts
- `tag.html` provides dynamic filtering by tag with URL parameters
- Tags are automatically extracted from article metadata

## CSS Architecture

The CSS uses a component-based architecture with CSS Custom Properties:

- **base.css**: Design tokens (colors, typography, spacing)
- **typography.css**: Font system (Source Serif Pro, Playfair Display, Inter)
- **layout.css**: Grid layouts and responsive design
- **components.css**: Reusable UI components

Customize the design by modifying CSS variables in `base.css`:
```css
:root {
  --color-primary: #1a1a1a;
  --font-serif: 'Source Serif Pro', Georgia, serif;
  --font-display: 'Playfair Display', Georgia, serif;
}
```

## JavaScript Features

The blog includes vanilla JavaScript for:
- Mobile navigation toggle
- Tag filtering (URL parameter-based)
- Search functionality
- Dynamic statistics calculation
- Smooth scrolling and animations
- Theme detection and responsive behaviors

## Content Guidelines

### Reading Time Calculation

Reading time is calculated based on Chinese reading standards:
- 400 Chinese characters per minute
- English words counted as single characters
- Use `Math.ceil()` to round up to whole minutes

### Statistics

All statistics across the site are dynamically calculated:
- Article counts per section
- Tag frequencies and relationships
- Reading time aggregates
- Last updated dates

### File Exclusions

The `.gitignore` excludes:
- `sources/` directory (contains source markdown files)
- `*.draft.md` files
- Development and system files

## Design System

The blog follows a consistent design system:
- **Typography**: Hierarchical scale using `--text-*` variables
- **Spacing**: 8-point grid system using `--space-*` variables
- **Colors**: Neutral palette with blue accent color
- **Components**: Reusable card, button, and navigation patterns

## Mobile-First Approach

All pages are built mobile-first with:
- Flexible grid layouts using CSS Grid and Flexbox
- Responsive typography scaling
- Touch-friendly interaction elements
- Progressive enhancement for larger screens