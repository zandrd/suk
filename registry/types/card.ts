import type { Snippet } from 'svelte';

export interface CardProps {
	variant?: 'default' | 'elevated' | 'outlined';
	children: Snippet;
	class?: string;
}

export interface CardHeaderProps {
	children: Snippet;
	class?: string;
}

export interface CardContentProps {
	children: Snippet;
	class?: string;
}

export interface CardFooterProps {
	children: Snippet;
	class?: string;
}
