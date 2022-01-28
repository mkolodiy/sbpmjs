import { writable } from 'svelte/store';
import { SbpmProcessGroup } from '../common/types';

export const processGroups = writable<SbpmProcessGroup[]>([]);

export const selectedProcessGroup = writable<SbpmProcessGroup>();
