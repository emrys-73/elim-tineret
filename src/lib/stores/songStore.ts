import { writable } from 'svelte/store';

// Count is only for testing purposes
export const count = writable(0);

export const name = writable("Name");
export const author = writable("Author");
export const tempo = writable(0);
export const key = writable("Key");
export const link = writable("YouTube Link");