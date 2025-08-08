# Shadcn + React CSR + Nx + Tailwind v4 Template

A modern, opinionated starter template for building **client-side rendered React** applications with:

- **[shadcn/ui](https://ui.shadcn.com/)** for beautiful, composable UI components
- **[React](https://react.dev/)** (client-side rendered with react-router)
- **[Nx](https://nx.dev/)** for monorepo support and scalable architecture
- **[Tailwind CSS v4](https://tailwindcss.com/)** for utility-first styling

This template is designed for rapid prototyping and scalable production apps.

#### Motivation

I was recently working on a complicated CSR frontend, and migrating it to NX while preserving all of my paths, tailwind/shadcn configs, eslint settings, etc. was difficult.

This template gives developers a solid foundation for building CSR React apps with modern component libraries, all while leveraging NX for its great developer experience. Most of the existing guides, templates, and starter kits focus on server side rendered apps. This one is old-fashioned CSR.

### Features

- ⚡ **Monorepo-ready** — Manage multiple apps and libraries with Nx.
- 🎨 **Pre-configured UI components** from shadcn/ui.
- 💨 **Tailwind CSS v4** with PostCSS pipeline.
- 🧩 **Shared Components Library** — Centralize and reuse UI across apps.
- 📦 **Modern tooling** — ESLint, Prettier, and TypeScript configured out of the box.

## Getting Started

### 1. Clone the repo + install dependencies

```bash
git clone https://github.com/danielschwabacher/react-shadcn-nx-template.git
cd react-shadcn-nx-template
npm install
```

### 2. Run the web-ui

```bash
npx nx run web-ui:dev
```

# Structure

### The included libraries and apps

`apps/web-ui`: This is where any code for the actual frontend application would live. Following the NX philosophy, you'll want to keep the amount of code in the `apps` folders minimal. Most of your code should live in `libs/*`.

- You can create additional apps with this command: `nx g @nx/web:app apps/my-app --bundler=vite`
- See the application generator [documentation](https://nx.dev/reference/core-api/web/generators/application) for more info.

`libs/shared-components`: This is where code for any shadcn components (as well as the tailwind themes used to style these components) live.

- To create additional libs, see [here](https://nx.dev/technologies/typescript/api/generators/library)

### Rename apps or libraries

If you want to rename any of the included apps or libs in this template, you'll want to use the `@nx/workspace:move` generator. Find docs for that [here](https://nx.dev/reference/core-api/workspace/generators/move#nxworkspacemove)

# shadcn

### Adding more components

Run this from the **root** of the repo: `npx shadcn@latest add <components_you_want_to_add>`

- This will add components to the `libs/shared-components` folder. Once in there, you can import them from `@/shared-components/...`
- See the `app.tsx` file for an example of component imports.

# Imports and path resolution

#### Path Resolution in `vite.config.ts` vs `tsconfig.base.json`

This template uses **TypeScript path aliases** so you can import code without long relative paths like `../../../`.

### 1. `tsconfig.base.json` — TypeScript Compilation

The `paths` section in `tsconfig.base.json` tells **TypeScript** how to resolve imports **at compile time**:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/shared-components/*": ["libs/shared-components/src/components/ui/*"],
      "@/lib/*": ["libs/shared-components/src/lib/*"]
    }
  }
}
```

💡 Key point:
This only affects TypeScript compilation. Your build tool (Vite in our case) also needs to know how to resolve these aliases.

### 2. `vite.config.ts` — Runtime & Build Resolution

While `tsconfig.base.json` handles compile-time, Vite needs its own alias mapping so imports resolve correctly during dev server hot reload and production builds.

Example `vite.config.ts`:

```
export default defineConfig(() => ({
  ...
  resolve: {
    alias: {
      "@/shared-components": path.resolve(
        __dirname,
        "../../libs/shared-components/src/components/ui"
      ),
      "@/shared-styles": path.resolve(
        __dirname,
        "../../libs/shared-components/src/styles"
      ),
    },
  },
  ...
}));
```

### 3. Keep the aliases in sync

You must keep `tsconfig.base.json` and `vite.config.ts` in sync —
if you add a new alias in one, add it in the other. If you don't do this, TypeScript may compile fine, but Vite will throw "module not found" errors. Or, Vite may run fine, but your editor will show TypeScript errors.
