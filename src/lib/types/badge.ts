import type { Component } from 'svelte';

export interface BadgeProps {
	/**
	 * Text content of the badge
	 */
	text: string;
	
	/**
	 * Visual variant of the badge
	 * @default 'default'
	 */
	variant?: 'default' | 'new' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline';
	
	/**
	 * Size of the badge
	 * @default 'md'
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	
	/**
	 * Optional icon component to display before text
	 * Use Lucide icons or any Svelte component
	 */
	icon?: Component;
	
	/**
	 * Additional CSS classes
	 */
	class?: string;
	
	/**
	 * Any additional HTML attributes
	 */
	[key: string]: any;
}