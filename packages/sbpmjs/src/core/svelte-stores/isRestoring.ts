import { writable } from 'svelte/store';

export const isRestoring = writable(false);

export function updateIsRestoring(value: boolean) {
  isRestoring.update(() => value);
}
