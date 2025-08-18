import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ComponentInfo, ComponentFile } from './registry.js';
import type { SukConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function installComponent(
	name: string,
	component: ComponentInfo,
	config: SukConfig,
	force: boolean = false
): Promise<void> {
	for (const file of component.files) {
		await installFile(name, file, config, force);
	}
}

async function installFile(
	componentName: string,
	file: ComponentFile,
	config: SukConfig,
	force: boolean
): Promise<void> {
	// Determine target directory based on file type
	let targetDir: string;
	switch (file.type) {
		case 'component':
			targetDir = config.aliases.components;
			break;
		case 'types':
			targetDir = config.aliases.types;
			break;
		case 'utils':
			targetDir = config.aliases.utils;
			break;
		default:
			targetDir = config.aliases.components;
	}

	// Ensure target directory exists
	mkdirSync(targetDir, { recursive: true });

	// Target file path
	const targetPath = join(targetDir, file.path);

	// Check if file already exists
	if (existsSync(targetPath) && !force) {
		throw new Error(`File ${file.path} already exists. Use --force to overwrite.`);
	}

	// Load template
	const templateContent = await loadTemplate(file.template);

	// Process template (replace placeholders, etc.)
	const processedContent = processTemplate(templateContent, componentName, config);

	// Write file
	const targetFileDir = dirname(targetPath);
	mkdirSync(targetFileDir, { recursive: true });
	writeFileSync(targetPath, processedContent);
}

async function loadTemplate(templateName: string): Promise<string> {
	const templatePath = join(__dirname, '../../../registry/templates/svelte', templateName);

	if (!existsSync(templatePath)) {
		// Fallback: create mock template
		return getMockTemplate(templateName);
	}

	return readFileSync(templatePath, 'utf-8');
}

function processTemplate(content: string, componentName: string, config: SukConfig): string {
	// Replace template variables
	return content
		.replace(/{{componentName}}/g, componentName)
		.replace(/{{ComponentName}}/g, capitalize(componentName))
		.replace(/{{typescript}}/g, config.tsx ? 'true' : 'false')
		.replace(/{{cssVariables}}/g, config.tailwind.cssVariables ? 'true' : 'false');
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getMockTemplate(templateName: string): string {
	const templates: Record<string, string> = {
		'button.svelte': `<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    children: Snippet;
    onclick?: () => void;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'default',
    disabled = false,
    children,
    onclick,
    class: className = ''
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary'
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10'
  };

  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
</script>

<button 
  class={classes}
  {disabled}
  {onclick}
  type="button"
>
  {@render children()}
</button>`,

		'button-types.ts': `export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  class?: string;
}`,

		'container.svelte': `<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
    class?: string;
    children: Snippet;
  }

  let {
    size = '7xl',
    class: className = '',
    children
  }: Props = $props();

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'w-full'
  };

  const classes = size === 'full' ? \`w-full \${className}\` : \`\${sizeClasses[size]} mx-auto \${className}\`;
</script>

<div class={classes}>
  {@render children()}
</div>`,

		'container-types.ts': `export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  class?: string;
}`
	};

	return templates[templateName] || '// Template not found';
}
