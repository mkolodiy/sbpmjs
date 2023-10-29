import { writable } from 'svelte/store';

export const showProperties = writable(false);

export function updateShowProperties(value: boolean) {
  showProperties.update(() => value);
}
