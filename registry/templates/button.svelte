<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    children: Snippet;
    onclick?: () => void;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'default',
    disabled = false,
    children,
    onclick,
    class: className = ''
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-300',
    destructive: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50 focus-visible:ring-slate-300',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300',
    ghost: 'hover:bg-slate-100 focus-visible:ring-slate-300',
    link: 'underline-offset-4 hover:underline text-slate-600 focus-visible:ring-slate-300'
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
</script>

<button 
  class={classes}
  {disabled}
  {onclick}
  type="button"
>
  {@render children()}
</button>