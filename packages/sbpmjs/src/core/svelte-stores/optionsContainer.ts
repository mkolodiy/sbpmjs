import type { Coordinates } from '@sbpmjs/shared';
import { writable } from 'svelte/store';

export type OptionsContainer = {
  id: string;
  label?: string;
  position?: Coordinates;
  subject?: string;
  message?: string;
};

export const optionsContainer = writable<OptionsContainer>({
  id: '',
  label: '',
  position: { x: 0, y: 0 },
  subject: '',
  message: '',
});
