import chalk from 'chalk';
import prompts from 'prompts';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { getSukConfig } from '../utils/config.js';

interface RemoveOptions {
  force?: boolean;
}

export async function removeCommand(components: string[], options: RemoveOptions) {
  try {
    // Check if SUK is initialized
    const config = await getSukConfig();
    if (!config) {
      console.log(chalk.red('❌ SUK is not initialized in this project.'));
      console.log(chalk.gray('Run `suk init` first to set up SUK.'));
      return;
    }

    if (components.length === 0) {
      console.log(chalk.red('❌ No components specified to remove.'));
      console.log(chalk.gray('Usage: suk remove <component-name> [component-name...]'));
      return;
    }

    // Confirm removal unless --force
    if (!options.force) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Remove ${components.length} component(s): ${components.join(', ')}?`,
        initial: false
      });

      if (!confirm) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }
    }

    // Remove components
    console.log(chalk.blue(`🗑️  Removing ${components.length} component(s)...\n`));

    for (const componentName of components) {
      try {
        // Component file path
        const componentPath = join(
          config.aliases.components, 
          `${componentName}.svelte`
        );

        // Types file path
        const typesPath = join(
          config.aliases.types,
          `${componentName}.ts`
        );

        let filesRemoved = 0;

        // Remove component file
        if (existsSync(componentPath)) {
          unlinkSync(componentPath);
          filesRemoved++;
          console.log(`  ${chalk.red('-')} ${componentPath}`);
        }

        // Remove types file
        if (existsSync(typesPath)) {
          unlinkSync(typesPath);
          filesRemoved++;
          console.log(`  ${chalk.red('-')} ${typesPath}`);
        }

        if (filesRemoved === 0) {
          console.log(`  ${chalk.yellow('⚠')} ${componentName} - not found`);
        } else {
          console.log(`  ${chalk.green('✓')} ${componentName} - removed ${filesRemoved} file(s)`);
        }

      } catch (error) {
        console.log(`  ${chalk.red('✗')} ${componentName} - error removing`);
        if (error instanceof Error) {
          console.error(chalk.red(`    ${error.message}`));
        }
      }
    }

    console.log(chalk.green('\n✅ Components removed successfully!'));
    console.log(chalk.yellow('⚠️  Remember to update your imports if needed.'));

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Error:'), error.message);
    }
    process.exit(1);
  }
}