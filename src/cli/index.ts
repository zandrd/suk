#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';

const program = new Command();

program
  .name('suk')
  .description('SUK - The Svelte UI Kit that doesn\'t suck')
  .version('0.1.0');

// ASCII Art banner
const banner = `
${chalk.hex('#ea580c')('  ____  _   _ _  __')}
${chalk.hex('#ea580c')(' / ___|| | | | |/ /')}
${chalk.hex('#ea580c')(' \\___ \\| | | | \' / ')}
${chalk.hex('#ea580c')('  ___) | |_| | . \\ ')}
${chalk.hex('#ea580c')(' |____/ \\___/|_|\\_\\')}

${chalk.gray('The Svelte UI Kit that doesn\'t suck')}
`;

// Show banner on help
const originalHelp = program.help;
program.help = function(options) {
  console.log(banner);
  originalHelp.call(this, options);
};

// Commands
program
  .command('init')
  .description('Initialize SUK in your project')
  .option('-p, --path <path>', 'Target directory', process.cwd())
  .option('-f, --force', 'Overwrite existing configuration')
  .action(initCommand);

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Component names to add')
  .option('-a, --all', 'Add all available components')
  .option('-f, --force', 'Overwrite existing components')
  .option('--dry-run', 'Show what would be added without actually adding')
  .action(addCommand);

program
  .command('list')
  .alias('ls')
  .description('List available components')
  .option('-d, --details', 'Show component details')
  .action(listCommand);

program
  .command('remove')
  .alias('rm')
  .description('Remove components from your project')
  .argument('[components...]', 'Component names to remove')
  .option('-f, --force', 'Skip confirmation')
  .action(removeCommand);

program
  .command('dev')
  .description('Start development with SUK devtools')
  .option('-p, --port <port>', 'Port number', '5173')
  .option('--visualizer', 'Enable state visualizer')
  .action(() => {
    console.log(chalk.blue('🚀 SUK development server starting...'));
    console.log(chalk.gray('(This feature will be available soon)'));
  });

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (err) {
  if (err instanceof Error) {
    console.error(chalk.red('Error:'), err.message);
    process.exit(1);
  }
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(banner);
  program.outputHelp();
}