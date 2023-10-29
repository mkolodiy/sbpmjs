import { writable } from 'svelte/store';

export const uiVisible = writable(true);

export function toggleUiVisible() {
  uiVisible.update((prevUiVisible) => !prevUiVisible);
}
