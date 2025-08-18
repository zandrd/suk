import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import { getRegistry } from '../utils/registry.js';
import { getSukConfig } from '../utils/config.js';
import { installComponent } from '../utils/installer.js';

interface AddOptions {
	all?: boolean;
	force?: boolean;
	dryRun?: boolean;
}

export async function addCommand(components: string[], options: AddOptions) {
	const spinner = ora();

	try {
		// Check if SUK is initialized
		const config = await getSukConfig();
		if (!config) {
			console.log(chalk.red('❌ SUK is not initialized in this project.'));
			console.log(chalk.gray('Run `suk init` first to set up SUK.'));
			return;
		}

		// Load registry
		spinner.start('Loading component registry...');
		const registry = await getRegistry();
		spinner.succeed('Registry loaded');

		if (!registry) {
			console.log(chalk.red('❌ Could not load component registry.'));
			return;
		}

		let componentsToAdd: string[] = [];

		// Handle --all flag
		if (options.all) {
			componentsToAdd = Object.keys(registry);

			if (!options.force) {
				const { confirm } = await prompts({
					type: 'confirm',
					name: 'confirm',
					message: `Add all ${componentsToAdd.length} components?`,
					initial: false
				});

				if (!confirm) {
					console.log(chalk.yellow('Operation cancelled.'));
					return;
				}
			}
		} else if (components.length === 0) {
			// Interactive component selection
			const choices = Object.entries(registry).map(([name, component]: [string, any]) => ({
				title: name,
				description: component.description,
				value: name
			}));

			const { selected } = await prompts({
				type: 'multiselect',
				name: 'selected',
				message: 'Select components to add:',
				choices,
				min: 1
			});

			if (!selected || selected.length === 0) {
				console.log(chalk.yellow('No components selected.'));
				return;
			}

			componentsToAdd = selected;
		} else {
			componentsToAdd = components;
		}

		// Validate components exist
		const invalidComponents = componentsToAdd.filter((name) => !registry[name]);
		if (invalidComponents.length > 0) {
			console.log(chalk.red(`❌ Unknown components: ${invalidComponents.join(', ')}`));
			console.log(chalk.gray('Run `suk list` to see available components.'));
			return;
		}

		// Dry run
		if (options.dryRun) {
			console.log(chalk.blue('🔍 Dry run - would add the following components:\n'));
			componentsToAdd.forEach((name) => {
				const component = registry[name];
				console.log(
					`  ${chalk.green('+')} ${chalk.white(name)} - ${chalk.gray(component.description)}`
				);
				if (component.dependencies?.length) {
					console.log(`    ${chalk.blue('Dependencies:')} ${component.dependencies.join(', ')}`);
				}
			});
			return;
		}

		// Install components
		console.log(chalk.blue(`🚀 Adding ${componentsToAdd.length} component(s)...\n`));

		for (const componentName of componentsToAdd) {
			const component = registry[componentName];

			spinner.start(`Installing ${componentName}...`);

			try {
				await installComponent(componentName, component, config, options.force);
				spinner.succeed(`${componentName} installed`);
			} catch (error) {
				spinner.fail(`Failed to install ${componentName}`);
				if (error instanceof Error) {
					console.error(chalk.red(`  Error: ${error.message}`));
				}
			}
		}

		// Success message
		console.log(chalk.green('\n✅ Components added successfully!\n'));
		console.log(chalk.blue('Next steps:'));
		console.log(chalk.gray('  Import components in your Svelte files:'));
		console.log(chalk.white(`  import { Button } from '$lib/components/ui';`));
	} catch (error) {
		spinner.fail('Failed to add components');
		if (error instanceof Error) {
			console.error(chalk.red('Error:'), error.message);
		}
		process.exit(1);
	}
}
