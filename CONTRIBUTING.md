# Contributing to SUK

Thanks for your interest in making SUK even less sucky! 🎯 This guide will help you get started with development and contributing to the project that's actually pleasant to work with.

## Development Setup

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** (required - because we have standards)
- **Git** (obviously)

### Getting Started

1. **Fork and clone the repository**

```bash
git clone https://github.com/your-username/suk.git
cd suk
```

2. **Install dependencies with pnpm** (the superior package manager)

```bash
pnpm install
```

3. **Start development mode**

```bash
# Start the development server (for the showcase site)
pnpm dev

# Or test the CLI in development mode
pnpm dev:cli --help
```

4. **Build the CLI** (watch the magic happen)

```bash
pnpm build:cli
```

## Project Structure

```
suk/
├── src/
│   ├── cli/                   # CLI source code (where the magic happens)
│   │   ├── commands/          # CLI command implementations
│   │   ├── utils/             # CLI utilities (the helpful bits)
│   │   └── index.ts           # CLI entry point
│   ├── lib/                   # Svelte components (for showcase)
│   └── routes/                # SvelteKit routes (showcase site)
├── registry/
│   ├── index.json             # Component registry (the source of truth)
│   ├── templates/             # Component templates (the good stuff)
│   └── types/                 # TypeScript type definitions
├── dist/                      # Built CLI output
└── docs/                      # Documentation (you are here)
```

## Development Workflow

### Working on the CLI

1. **Make changes to CLI code in `src/cli/`**
2. **Build the CLI**: `pnpm build:cli`
3. **Test locally**: `pnpm dev:cli <command>`

Example:

```bash
# Build CLI
pnpm build:cli

# Test init command (prepare to be amazed)
pnpm dev:cli init test-project

# Test add command
cd test-project
../node_modules/.bin/tsx ../src/cli/index.ts add button
```

### Working on Components

1. **Add component definition to `registry/index.json`**
2. **Create component template in `registry/templates/`**
3. **Create type definitions in `registry/types/`**
4. **Test the component installation** (make sure it doesn't suck)

### Testing Your Changes

1. **Run the test suite** (no broken code allowed)

```bash
pnpm test
```

2. **Test CLI commands manually** (the real test)

```bash
# Create a test project
mkdir test-suk && cd test-suk
npm create svelte@latest .
pnpm install

# Test SUK CLI (cross your fingers)
pnpm dlx ../dist/index.js init
pnpm dlx ../dist/index.js add button
```

3. **Check code quality** (we have standards)

```bash
# Run linter
pnpm lint

# Format code (make it pretty)
pnpm format

# Type check (TypeScript doesn't lie)
pnpm check
```

## Adding New Components

### 1. Component Definition

Add your component to `registry/index.json` (be descriptive, future you will thank you):

```json
{
	"my-component": {
		"name": "my-component",
		"description": "Does exactly what it says, no surprises",
		"category": "form|layout|display|overlay|feedback",
		"dependencies": [],
		"devDependencies": [],
		"files": [
			{
				"path": "my-component.svelte",
				"template": "my-component.svelte",
				"type": "component"
			},
			{
				"path": "my-component.ts",
				"template": "my-component-types.ts",
				"type": "types"
			}
		],
		"size": "X.XkB",
		"exports": ["MyComponent", "MyComponentProps"]
	}
}
```

### 2. Component Template

Create `registry/templates/my-component.svelte` (make it beautiful):

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		// Component props here (be specific)
		children: Snippet;
		class?: string;
	}

	let {
		// Destructure props (Svelte 5 style)
		children,
		class: className = ''
	}: Props = $props();

	// Component logic here (keep it simple)
</script>

<!-- Component template here (make it semantic) -->
<div class={className}>
	{@render children()}
</div>
```

### 3. Type Definitions

Create `registry/types/my-component-types.ts` (TypeScript loves you back):

```typescript
export interface MyComponentProps {
	// Export the component props interface
	class?: string;
}
```

### 4. Component Guidelines

- **Size Target**: Keep components under 5kB (nobody likes bloat)
- **TypeScript**: Use strict TypeScript with proper interfaces (types save lives)
- **Tailwind**: Use Tailwind CSS classes for styling (utility-first life)
- **Svelte 5**: Use runes (`$props()`, `$state()`, etc.) - embrace the future
- **Accessibility**: Include proper ARIA attributes (be inclusive)
- **Responsive**: Mobile-first responsive design (phone users matter too)

### 5. Testing Components

```bash
# Test component installation (moment of truth)
pnpm build:cli
cd test-project
pnpm dlx ../dist/index.js add my-component

# Verify files are created (success!)
ls src/lib/components/ui/my-component.svelte
ls src/lib/types/my-component.ts
```

## CLI Development

### Adding New Commands

1. **Create command file in `src/cli/commands/`**

```typescript
// src/cli/commands/my-command.ts
import chalk from 'chalk';

interface MyCommandOptions {
	option1?: boolean;
}

export async function myCommand(args: string[], options: MyCommandOptions) {
	try {
		console.log(chalk.blue('Running my command... (this might take a moment)'));
		// Command implementation
	} catch (error) {
		console.error(chalk.red('Error:'), error);
		process.exit(1);
	}
}
```

2. **Add command to CLI in `src/cli/index.ts`**

```typescript
import { myCommand } from './commands/my-command.js';

program
	.command('my-command')
	.description('Description of my command (be helpful)')
	.option('--option1', 'Description of option')
	.action(myCommand);
```

### CLI Guidelines

- **Error Handling**: Always handle errors gracefully (users appreciate kindness)
- **User Feedback**: Use chalk for colored output and ora for spinners (make it pleasant)
- **Validation**: Validate user input and provide helpful error messages (no cryptic errors)
- **Prompts**: Use prompts for interactive input when needed (guide them gently)

## Code Style

### TypeScript

- Use strict TypeScript configuration (strict is good)
- Define interfaces for all props and options (explicit is better than implicit)
- Use explicit return types for functions (clarity wins)
- Prefer `interface` over `type` for object shapes (consistency matters)

### Svelte

- Use Svelte 5 runes syntax (modern Svelte is best Svelte)
- Destructure props using `$props()` (clean and clear)
- Use `Snippet` type for children (type safety for the win)
- Follow reactive patterns with `$state()` and `$derived()` (reactive is beautiful)

### General

- Use meaningful variable names (no `x` or `temp` nonsense)
- Add JSDoc comments for complex functions (help your future self)
- Keep functions small and focused (single responsibility principle)
- Use consistent naming conventions (predictability is good)

## Testing

### Running Tests

```bash
# Run all tests (fingers crossed)
pnpm test

# Run tests in watch mode (continuous improvement)
pnpm test:watch

# Run specific test file (targeted testing)
pnpm test src/cli/commands/add.test.ts
```

### Writing Tests

Tests are written using Vitest (because it's fast and doesn't suck):

```typescript
// src/cli/commands/add.test.ts
import { describe, it, expect } from 'vitest';
import { addCommand } from './add.js';

describe('add command', () => {
	it('should add components successfully', async () => {
		// Test implementation (make it comprehensive)
	});
});
```

## Documentation

### README Updates

When adding new features (keep it fresh):

1. Update the main README.md
2. Add examples if applicable (show, don't just tell)
3. Update the component list (completeness matters)
4. Add any new CLI commands to the usage section

### Code Comments

- Add JSDoc comments for exported functions (documentation as code)
- Explain complex logic with inline comments (future developers will thank you)
- Document any non-obvious behavior (surprises are only good at parties)

## Submitting Changes

### Pull Request Process

1. **Create a feature branch** (keep things organized)

```bash
git checkout -b feature/my-awesome-feature
```

2. **Make your changes**
   - Follow the coding standards (consistency is key)
   - Add tests for new functionality (test everything)
   - Update documentation (docs matter)

3. **Test your changes** (thoroughly)

```bash
pnpm test
pnpm lint
pnpm check
```

4. **Commit your changes** (be descriptive)

```bash
git add .
git commit -m "feat: add awesome new component that doesn't suck"
```

Use conventional commit messages (because structure helps):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code refactoring
- `test:` for adding tests

5. **Push and create PR** (share the goodness)

```bash
git push origin feature/my-awesome-feature
```

Then create a pull request on GitHub (make it compelling).

### PR Requirements

- [ ] All tests pass (green is good)
- [ ] Code is properly formatted (pretty code is happy code)
- [ ] Documentation is updated (keep it current)
- [ ] Changes are tested manually (real-world testing)
- [ ] PR description explains the changes (context matters)
- [ ] Screenshots/examples for UI changes (seeing is believing)

## Release Process

Releases are handled by maintainers (we got this):

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Publish to NPM
5. Create GitHub release

## Getting Help

Don't be shy - we're here to help make SUK better together:

- **GitHub Issues**: [Report bugs or request features](https://github.com/zandrd/suk/issues) (we read everything)
- **GitHub Discussions**: [Ask questions](https://github.com/zandrd/suk/discussions) (no question is too small)
- **Twitter**: [@zandrd](https://twitter.com/zandrd) (for quick thoughts)

## Code of Conduct

We're building something great together, so let's keep it professional and kind. SUK should be a place where everyone feels welcome to contribute their best work.

### Our Standards

- Use welcoming language (words matter)
- Be respectful of differing viewpoints and experiences (diversity makes us stronger)
- Gracefully accept constructive criticism (we're all learning)
- Focus on what is best for the community (collective wins)
- Show empathy towards other community members (kindness is free)

## License

By contributing to SUK, you agree that your contributions will be licensed under the MIT License (keeping it simple and open).

---

Thank you for helping make SUK the Svelte UI Kit that truly doesn't suck!

_This is my first library, and I'm learning while building. Any recommendations, suggestions, or contributions are incredibly valuable - whether you're fixing a typo or proposing a major feature. We're all coding and learning together!_

_P.S. If you find any bugs, remember: it's not a bug, it's an undocumented feature. Just kidding - please report them._ 😉
