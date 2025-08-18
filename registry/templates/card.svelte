<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'default' | 'elevated' | 'outlined';
    children: Snippet;
    class?: string;
  }

  let {
    variant = 'default',
    children,
    class: className = ''
  }: Props = $props();

  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variants = {
    default: 'bg-white border border-slate-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-slate-300'
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;
</script>

<div class={classes}>
  {@render children()}
</div>