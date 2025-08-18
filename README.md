# SUK - The Svelte UI Kit that doesn't suck

<div align="center">

```
  ____  _   _ _  __
 / ___|| | | | |/ /
 \___ \| | | | ' /
  ___) | |_| | . \
 |____/ \___/|_|\_\
```

**The Svelte UI Kit that doesn't suck**

[![npm version](https://badge.fury.io/js/@zandrd%2Fsuk.svg)](https://www.npmjs.com/package/@zandrd/suk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Installation](#installation) • [Usage](#usage) • [Components](#components) • [Examples](#examples)

</div>

## What is SUK?

SUK is a modern, CLI-based component distribution system for **Svelte 5** that takes a refreshingly different approach. Unlike traditional NPM packages that bloat your bundle, SUK copies component source code directly into your project, enabling perfect tree-shaking and zero bundle overhead. Because who needs 88kB when 3kB does the job?

### Why SUK over traditional UI libraries?

**Problem with Traditional Libraries:**

- 🐘 Monolithic bundles (88kB for 7 components)
- 📦 Forced to include unused code
- 🔒 Limited customization
- ⚡ Framework lock-in

**SUK Solution:**

- 🎯 Install only what you need: `suk add button` (3kB) vs full library (88kB)
- 🔧 Full source code ownership
- 🌳 Perfect tree-shaking
- 🚀 Zero runtime dependencies

## Installation

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm
- **Svelte 5** project
- **Tailwind CSS** configured

### Global Installation (Recommended)

```bash
# Install SUK globally with pnpm
pnpm add -g @zandrd/suk

# Verify installation
suk --version
```

### Alternative: Use without installing

```bash
# Run directly with pnpm
pnpm dlx @zandrd/suk init my-project

# Or with npm
npx @zandrd/suk init my-project
```

## Quick Start

### 1. Initialize SUK in your project

```bash
# In your existing Svelte project
suk init

# Or create a new project with SUK
suk init my-awesome-app
```

This will:

- Create a `suk.json` configuration file
- Detect your project setup (TypeScript, Tailwind)
- Configure component paths

### 2. Add your first component

```bash
# Add a single component
suk add button

# Add multiple components
suk add button container grid

# Add all components
suk add --all
```

### 3. Use in your Svelte files

```svelte
<script>
	import { Button } from '$lib/components/ui';
</script>

<Button variant="default" onclick={() => console.log('Hello SUK!')}>Click me</Button>
```

## Usage

### Core Commands

#### `suk init`

Initialize SUK in your project

```bash
suk init                    # Initialize in current directory
suk init my-project         # Create new project
suk init --force            # Overwrite existing config
```

#### `suk add`

Add components to your project

```bash
suk add button              # Add specific component
suk add button card input   # Add multiple components
suk add --all               # Add all components
suk add --dry-run           # Preview what will be added
suk add --force             # Overwrite existing files
```

#### `suk list`

Show available components

```bash
suk list                    # List all components
suk list --details          # Show detailed information
suk ls                      # Alias for list
```

#### `suk remove`

Remove components from your project

```bash
suk remove button           # Remove specific component
suk remove button card      # Remove multiple components
suk remove --force          # Skip confirmation
suk rm button               # Alias for remove
```

#### `suk dev` _(Coming Soon)_

Start development with SUK devtools

```bash
suk dev                     # Start with basic devtools
suk dev --visualizer        # Start with state visualizer
```

## Components

SUK provides a comprehensive set of components optimized for Svelte 5:

### Form Components

- **Button** (3.2kB) - Interactive button with variants, sizes, and icon support
- **Input** (4.1kB) - Form input field with variants, validation states, and icons

### Layout Components

- **Container** (1.8kB) - Responsive container with max-width constraints and padding
- **Grid** (2.1kB) - CSS Grid layout with responsive columns and gap control
- **Flex** (2.3kB) - Flexbox layout with direction, alignment, and gap control

### Display Components

- **Card** (2.8kB) - Flexible content container with header, body, and footer sections
- **Badge** (1.9kB) - Small status indicator with color variants and sizes

### Overlay Components

- **Dialog** (5.7kB) - Modal dialog with backdrop, animations, and accessibility features

### Feedback Components

- **Spinner** (1.5kB) - Loading indicator with size and color variants
- **Toast** (6.3kB) - Notification toast with variants, actions, and auto-dismiss

## Configuration

SUK uses a `suk.json` file to configure component installation:

```json
{
	"$schema": "https://suk.zandrd.dev/schema.json",
	"style": "default",
	"rsc": false,
	"tsx": true,
	"tailwind": {
		"config": "tailwind.config.js",
		"css": "src/app.css",
		"baseColor": "neutral",
		"cssVariables": true
	},
	"aliases": {
		"components": "src/lib/components/ui",
		"utils": "src/lib/utils",
		"types": "src/lib/types",
		"ui": "src/lib/components/ui"
	}
}
```

## Examples

### Basic Button Usage

```svelte
<script>
	import { Button } from '$lib/components/ui';
</script>

<!-- Different variants -->
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

<!-- Different sizes -->
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Layout with Container and Grid

```svelte
<script>
	import { Container, Grid, Card } from '$lib/components/ui';
</script>

<Container size="7xl">
	<Grid cols="3" gap="lg">
		<Card>
			<h3>Card 1</h3>
			<p>Content here</p>
		</Card>
		<Card>
			<h3>Card 2</h3>
			<p>Content here</p>
		</Card>
		<Card>
			<h3>Card 3</h3>
			<p>Content here</p>
		</Card>
	</Grid>
</Container>
```

### Form with Input and Button

```svelte
<script>
	import { Input, Button, Flex } from '$lib/components/ui';

	let email = '';
</script>

<Flex direction="col" gap="md">
	<Input bind:value={email} placeholder="Enter your email" type="email" />
	<Button onclick={() => console.log('Email:', email)}>Subscribe</Button>
</Flex>
```

## Migration from Traditional UI Libraries

### From Material-UI/Chakra UI

```diff
- npm install @mui/material
- import { Button } from '@mui/material';
+ pnpm add -g @zandrd/suk
+ suk add button
+ import { Button } from '$lib/components/ui';
```

**Benefits:**

- 🎯 **Bundle size**: 88kB → 3kB (97% reduction)
- 🔧 **Customization**: Full source code control
- ⚡ **Performance**: Zero runtime overhead

### From Component Libraries with Copy-Paste Approach

```diff
- Manual copy-paste from documentation
- Managing updates manually
+ pnpm add -g @zandrd/suk
+ suk init
+ suk add button
```

**Advantages:**

- 🚀 **Svelte 5 Native**: Built for runes and modern Svelte
- 📊 **State Visualizer**: Built-in devtools (coming soon)
- 📦 **CLI Automation**: No more manual copy-paste
- 🔄 **Easy Updates**: Update components with a single command

## Architecture

SUK follows a **copy-paste distribution** model:

1. **Components are copied**, not imported from node_modules
2. **Perfect tree-shaking** - only pay for what you use
3. **Source code ownership** - modify components as needed
4. **Zero bundle overhead** - no runtime dependencies

### Bundle Size Comparison

| Library     | Bundle Size | Components        | Size per Component |
| ----------- | ----------- | ----------------- | ------------------ |
| Material-UI | 334kB       | 50+               | ~6.7kB             |
| Chakra UI   | 156kB       | 40+               | ~3.9kB             |
| **SUK**     | **3-6kB**   | **Per component** | **3-6kB**          |

## Development

### Requirements

- Node.js 18+
- pnpm
- Svelte 5
- TypeScript (recommended)
- Tailwind CSS

### Contributing

```bash
# Clone the repository
git clone https://github.com/zandrd/suk
cd suk

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build CLI
pnpm build:cli

# Test CLI locally
pnpm dev:cli init test-project
```

## Roadmap

### ✅ Phase 1: MVP (Current)

- [x] CLI with core commands
- [x] Component registry system
- [x] Basic components (Button, Container, Grid, etc.)
- [x] NPM package distribution

### 🚧 Phase 2: Enhanced DX

- [ ] State visualizer integration
- [ ] Component hot-reloading
- [ ] SvelteKit plugin
- [ ] Component themes and variants

### 🔮 Phase 3: Advanced Features

- [ ] Chrome extension for devtools
- [ ] Performance monitoring
- [ ] AI-powered component suggestions
- [ ] Community registry

## FAQ

### Why not just use a regular NPM package?

Traditional NPM packages force you to include the entire library in your bundle, even if you only use one component. SUK copies only the components you actually use, resulting in dramatically smaller bundle sizes.

### Can I customize the components?

Absolutely! Since SUK copies the source code to your project, you have full control over every component. Modify styles, add features, or create variants as needed.

### Does SUK work with SvelteKit?

Yes! SUK is designed to work seamlessly with SvelteKit projects. The component paths and imports are configured to work with SvelteKit's file structure.

### What about updates?

When SUK releases updates, you can run `suk update` to get the latest versions of components. Since you own the source code, you can choose which updates to apply.

## License

MIT © [Andrés Mardones](https://github.com/andresmardones)

_This is my first library - any recommendations, feedback, or contributions are more than welcome! I'm learning and coding my way through this journey, and your insights help make SUK better for everyone._

## Support

- 📖 [Documentation](https://suk.zandrd.dev)
- 🐛 [Issue Tracker](https://github.com/zandrd/suk/issues)
- 💬 [Discussions](https://github.com/zandrd/suk/discussions)
- 🐦 [Twitter](https://twitter.com/zandrd)

---

<div align="center">
  <strong>Built with ❤️ for the Svelte community</strong>
</div>
