import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ComponentFile {
  path: string;
  template: string;
  type: 'component' | 'types' | 'utils';
}

export interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  dependencies: string[];
  devDependencies: string[];
  files: ComponentFile[];
  size: string;
  exports: string[];
}

export type Registry = Record<string, ComponentInfo>;

export async function getRegistry(): Promise<Registry | null> {
  try {
    // Path to registry from CLI location
    const registryPath = join(__dirname, '../../../registry/index.json');
    
    if (!existsSync(registryPath)) {
      // Fallback: create mock registry for development
      return getMockRegistry();
    }

    const registryContent = readFileSync(registryPath, 'utf-8');
    return JSON.parse(registryContent) as Registry;
  } catch (error) {
    console.error('Failed to load registry:', error);
    return getMockRegistry();
  }
}

function getMockRegistry(): Registry {
  return {
    button: {
      name: 'button',
      description: 'Interactive button with variants and icons',
      category: 'form',
      dependencies: [],
      devDependencies: ['@lucide/svelte'],
      files: [
        {
          path: 'button.svelte',
          template: 'button.svelte',
          type: 'component'
        },
        {
          path: 'button.ts',
          template: 'button-types.ts',
          type: 'types'
        }
      ],
      size: '3.2kB',
      exports: ['Button', 'ButtonProps']
    },
    container: {
      name: 'container',
      description: 'Responsive container with max-width constraints',
      category: 'layout',
      dependencies: [],
      devDependencies: [],
      files: [
        {
          path: 'container.svelte',
          template: 'container.svelte',
          type: 'component'
        },
        {
          path: 'container.ts',
          template: 'container-types.ts',
          type: 'types'
        }
      ],
      size: '1.8kB',
      exports: ['Container', 'ContainerProps']
    },
    grid: {
      name: 'grid',
      description: 'CSS Grid layout with responsive columns',
      category: 'layout',
      dependencies: [],
      devDependencies: [],
      files: [
        {
          path: 'grid.svelte',
          template: 'grid.svelte',
          type: 'component'
        },
        {
          path: 'grid.ts',
          template: 'grid-types.ts',
          type: 'types'
        }
      ],
      size: '2.1kB',
      exports: ['Grid', 'GridProps']
    },
    flex: {
      name: 'flex',
      description: 'Flexbox layout with direction and alignment control',
      category: 'layout',
      dependencies: [],
      devDependencies: [],
      files: [
        {
          path: 'flex.svelte',
          template: 'flex.svelte',
          type: 'component'
        },
        {
          path: 'flex.ts',
          template: 'flex-types.ts',
          type: 'types'
        }
      ],
      size: '2.3kB',
      exports: ['Flex', 'FlexProps']
    }
  };
}