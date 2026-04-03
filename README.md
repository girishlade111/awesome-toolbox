# DevHub - Developer Tool Community Hub

A community-driven collection of resources for developers, featuring agents, prompts, instructions, and plugins.

## Features

- **Resource Catalog** - Searchable collection of community-contributed tools
- **Learning Hub** - Tutorials and guides for all skill levels
- **Multiple Categories** - Agents, Prompts, Instructions, and Plugins
- **Filter & Search** - Find exactly what you need with powerful filters

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- Vanilla CSS with custom properties
- GitHub Pages for hosting

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/devhub.git
   cd devhub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── data/
│   │   └── resources.json    # Resource data
│   ├── layouts/
│   │   └── Layout.astro     # Main layout
│   ├── pages/
│   │   ├── index.astro     # Home page
│   │   ├── browse.astro    # Browse resources
│   │   ├── learn.astro     # Learning hub
│   │   └── submit.astro    # Contribution page
│   ├── styles/
│   │   └── global.css      # Global styles
│   └── types.ts            # TypeScript types
├── public/                       # Static assets
├── .github/workflows/            # GitHub Actions
└── SPEC.md                       # Project specification
```

## Adding Resources

To add a new resource, edit `src/data/resources.json`:

```json
{
  "id": "unique-id",
  "title": "Resource Name",
  "description": "Short description",
  "category": "agent|prompt|instruction|plugin",
  "author": "GitHub username",
  "authorUrl": "https://github.com/username",
  "tags": ["tag1", "tag2"],
  "url": "https://link-to-resource",
  "addedAt": "2026-04-03"
}
```

## Deployment

The site is configured to deploy automatically to GitHub Pages via GitHub Actions.

1. Update `astro.config.mjs` with your GitHub username and repository name
2. Push to main branch
3. Enable GitHub Pages in repository settings (select "GitHub Actions")
4. The workflow will deploy automatically

## License

MIT License - See LICENSE file for details.