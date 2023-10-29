import { writable } from 'svelte/store';

export type OptionsContainer = {
  id: string;
  [key: string]: unknown;
};

export const optionsContainer = writable<OptionsContainer>({
  id: '',
});
