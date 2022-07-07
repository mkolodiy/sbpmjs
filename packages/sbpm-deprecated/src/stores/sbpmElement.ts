import { writable } from 'svelte/store';
import { SbpmElement } from '../common/types';

export const selectedSbpmElement = writable<SbpmElement>();
