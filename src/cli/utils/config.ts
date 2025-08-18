import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface SukConfig {
	$schema?: string;
	style: string;
	rsc: boolean;
	tsx: boolean;
	tailwind: {
		config: string;
		css: string;
		baseColor: string;
		cssVariables: boolean;
	};
	aliases: {
		components: string;
		utils: string;
		types: string;
		ui: string;
	};
}

export async function getSukConfig(cwd: string = process.cwd()): Promise<SukConfig | null> {
	const configPath = join(cwd, 'suk.json');

	if (!existsSync(configPath)) {
		return null;
	}

	try {
		const configContent = readFileSync(configPath, 'utf-8');
		return JSON.parse(configContent) as SukConfig;
	} catch (error) {
		throw new Error(
			`Failed to parse suk.json: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

export function validateConfig(config: SukConfig): string[] {
	const errors: string[] = [];

	if (!config.aliases?.components) {
		errors.push('Missing aliases.components in configuration');
	}

	if (!config.aliases?.utils) {
		errors.push('Missing aliases.utils in configuration');
	}

	if (!config.aliases?.types) {
		errors.push('Missing aliases.types in configuration');
	}

	return errors;
}
