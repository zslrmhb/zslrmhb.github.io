import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

export const theme = writable<Theme>('light');

function applyTheme(next: Theme) {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', next === 'dark');
	document.documentElement.style.colorScheme = next;
	try {
		localStorage.setItem('theme', next);
	} catch {
		// Keep the in-memory and visual theme usable when storage is unavailable.
	}
	theme.set(next);
}

export function initializeTheme() {
	if (!browser) return;
	let saved: string | null = null;
	try {
		saved = localStorage.getItem('theme');
	} catch {
		// Fall back to the system preference when storage is denied.
	}
	const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	applyTheme(saved === 'dark' || saved === 'light' ? saved : preferred);
}

export function toggleTheme() {
	applyTheme(get(theme) === 'dark' ? 'light' : 'dark');
}
