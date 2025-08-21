<script lang="ts">
	import type { BadgeProps } from '$lib/types/badge.ts';

	let {
		text,
		variant = 'default',
		size = 'md',
		icon,
		class: className = '',
		...props
	}: BadgeProps = $props();

	// Variant styles - Modern, subtle design with better contrast + dark mode support
	const variants = {
		default:
			'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-750',
		new: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-900/30',
		success:
			'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30',
		warning:
			'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/30',
		error:
			'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30',
		info: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30',
		neutral:
			'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-750',
		outline:
			'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800/50'
	};

	// Size styles - More refined spacing
	const sizes = {
		xs: 'px-2 py-0.5 text-xs font-medium',
		sm: 'px-2.5 py-0.5 text-xs font-medium',
		md: 'px-3 py-1 text-sm font-medium',
		lg: 'px-3.5 py-1 text-sm font-semibold',
		xl: 'px-4 py-1.5 text-base font-semibold'
	};

	// Icon sizes
	const iconSizes = {
		xs: 'h-3 w-3',
		sm: 'h-3 w-3',
		md: 'h-3.5 w-3.5',
		lg: 'h-4 w-4',
		xl: 'h-4 w-4'
	};

	const badgeClasses = [
		'inline-flex items-center gap-1.5 rounded-md border shadow-sm',
		'transition-all duration-200 ease-in-out',
		'whitespace-nowrap select-none',
		variants[variant],
		sizes[size],
		className
	].join(' ');
</script>

<span class={badgeClasses} {...props}>
	{#if icon}
		<icon class={iconSizes[size]}></icon>
	{/if}
	{text}
</span>
