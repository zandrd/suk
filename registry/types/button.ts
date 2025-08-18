import type { Snippet } from 'svelte';

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  children: Snippet;
  onclick?: () => void;
  class?: string;
}