import chalk from 'chalk';
import prompts from 'prompts';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import ora from 'ora';

interface InitOptions {
	path: string;
	force?: boolean;
}

export async function initCommand(options: InitOptions) {
	const spinner = ora();

	try {
		console.log(chalk.blue('🎯 Initializing SUK in your project...\n'));

		const projectPath = options.path;
		const configPath = join(projectPath, 'suk.json');

		// Check if already initialized
		if (existsSync(configPath) && !options.force) {
			const { overwrite } = await prompts({
				type: 'confirm',
				name: 'overwrite',
				message: 'SUK is already initialized. Overwrite configuration?',
				initial: false
			});

			if (!overwrite) {
				console.log(chalk.yellow('Initialization cancelled.'));
				return;
			}
		}

		// Detect project type
		spinner.start('Detecting project configuration...');

		const hasPackageJson = existsSync(join(projectPath, 'package.json'));
		const hasSvelteConfig = existsSync(join(projectPath, 'svelte.config.js'));
		const hasTailwindConfig = existsSync(join(projectPath, 'tailwind.config.js'));

		if (!hasPackageJson) {
			spinner.fail('No package.json found. Please run this in a Node.js project.');
			return;
		}

		spinner.succeed('Project configuration detected');

		// Configuration prompts
		const config = await prompts([
			{
				type: 'text',
				name: 'componentsPath',
				message: 'Where would you like to install components?',
				initial: 'src/lib/components/ui'
			},
			{
				type: 'text',
				name: 'utilsPath',
				message: 'Where would you like to install utility functions?',
				initial: 'src/lib/utils'
			},
			{
				type: 'text',
				name: 'typesPath',
				message: 'Where would you like to install types?',
				initial: 'src/lib/types'
			},
			{
				type: 'confirm',
				name: 'typescript',
				message: 'Are you using TypeScript?',
				initial: true
			},
			{
				type: 'confirm',
				name: 'tailwind',
				message: 'Are you using Tailwind CSS?',
				initial: hasTailwindConfig
			}
		]);

		// Create SUK configuration
		const sukConfig = {
			$schema: 'https://suk.zandrd.dev/schema.json',
			style: 'default',
			rsc: false,
			tsx: config.typescript,
			tailwind: {
				config: 'tailwind.config.js',
				css: 'src/app.css',
				baseColor: 'neutral',
				cssVariables: true
			},
			aliases: {
				components: config.componentsPath,
				utils: config.utilsPath,
				types: config.typesPath,
				ui: config.componentsPath
			}
		};

		// Write configuration
		spinner.start('Creating configuration file...');
		writeFileSync(configPath, JSON.stringify(sukConfig, null, 2));
		spinner.succeed('Configuration created');

		// Success message
		console.log(chalk.green('\n✅ SUK initialized successfully!\n'));
		console.log(chalk.blue('Next steps:'));
		console.log(chalk.gray('  1. Add your first component:'));
		console.log(chalk.white('     suk add button\n'));
		console.log(chalk.gray('  2. View available components:'));
		console.log(chalk.white('     suk list\n'));
		console.log(chalk.gray('  3. Start building with SUK! 🚀'));
	} catch (error) {
		spinner.fail('Initialization failed');
		if (error instanceof Error) {
			console.error(chalk.red('Error:'), error.message);
		}
		process.exit(1);
	}
}
