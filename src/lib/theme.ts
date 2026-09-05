import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

export const theme = writable<Theme>('light');

function applyTheme(next: Theme) {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', next === 'dark');
	document.documentElement.style.colorScheme = next;
	localStorage.setItem('theme', next);
	theme.set(next);
}

export function initializeTheme() {
	if (!browser) return;
	const saved = localStorage.getItem('theme');
	const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	applyTheme(saved === 'dark' || saved === 'light' ? saved : preferred);
}

export function toggleTheme() {
	applyTheme(get(theme) === 'dark' ? 'light' : 'dark');
}
