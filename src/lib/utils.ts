import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(
  dateInput: string | Date | undefined | null,
  dateStyle: DateStyle = 'medium',
  locales = 'en'
) {
  if (!dateInput) return '';

  // Normalize to a Date instance
  let d: Date;
  if (dateInput instanceof Date) {
    d = dateInput;
  } else {
    // If it's a plain YYYY-MM-DD (Safari-unfriendly), swap dashes for slashes
    const s = String(dateInput);
    const normalized = /\d{4}-\d{2}-\d{2}$/.test(s) ? s.replaceAll('-', '/') : s;
    d = new Date(normalized);
  }

  // Fallback parser if the above failed
  if (isNaN(d.getTime())) {
    const ts = Date.parse(String(dateInput));
    if (!isNaN(ts)) d = new Date(ts);
  }

  // Still invalid? return empty string to avoid runtime errors
  if (isNaN(d.getTime())) return '';

  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(d);
}