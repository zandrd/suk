import chalk from 'chalk';
import { getRegistry } from '../utils/registry.js';

interface ListOptions {
	details?: boolean;
}

export async function listCommand(options: ListOptions) {
	try {
		console.log(chalk.blue('📦 Available SUK Components\n'));

		const registry = await getRegistry();

		if (!registry || Object.keys(registry).length === 0) {
			console.log(chalk.yellow('No components available in registry.'));
			return;
		}

		// Group components by category
		const categories = new Map<string, any[]>();

		Object.entries(registry).forEach(([name, component]: [string, any]) => {
			const category = component.category || 'general';
			if (!categories.has(category)) {
				categories.set(category, []);
			}
			categories.get(category)!.push({ name, ...component });
		});

		// Display components by category
		categories.forEach((components, category) => {
			console.log(chalk.cyan(`${category.charAt(0).toUpperCase() + category.slice(1)}`));

			components.forEach((component) => {
				const { name, description, size } = component;

				if (options.details) {
					console.log(`  ${chalk.green('●')} ${chalk.white(name)}`);
					console.log(`    ${chalk.gray(description)}`);
					if (size) {
						console.log(`    ${chalk.blue('Size:')} ${chalk.yellow(size)}`);
					}
					console.log();
				} else {
					const sizeInfo = size ? chalk.gray(` (${size})`) : '';
					console.log(
						`  ${chalk.green('●')} ${chalk.white(name)}${sizeInfo} - ${chalk.gray(description)}`
					);
				}
			});

			console.log();
		});

		console.log(chalk.blue('Usage:'));
		console.log(chalk.gray('  suk add <component-name>    Add a specific component'));
		console.log(chalk.gray('  suk add button container    Add multiple components'));
		console.log(chalk.gray('  suk list --details          Show detailed information'));
	} catch (error) {
		console.error(chalk.red('Error loading component registry:'), error);
		process.exit(1);
	}
}
