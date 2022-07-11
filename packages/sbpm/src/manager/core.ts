import type { SbpmElementType, SbpmShapeType } from '@sbpmjs/shared';
import { writable } from 'svelte/store';

const PaletteItems: Record<SbpmShapeType | string, SbpmElementType[]> = {
  defaultView: ['ProcessModel'],
  ProcessModel: ['Subject'],
  MessageTransition: ['Message'],
  Subject: ['SendState', 'ReceiveState', 'FunctionState'],
};

const views: Record<string, string[]> = {
  defaultView: [],
};

export const currentlySelectedSbpmShape = writable();

export const activePaletteItems = writable<SbpmElementType[]>(['ProcessModel']);

export function setActivePaletteItems(palette: SbpmShapeType | string) {
  activePaletteItems.update(() => PaletteItems[palette]);
}

export function getViews() {
  return views;
}

export function getView(view: string) {
  return views[view];
}

export function setView(view: string, items: string[]) {
  views[view] = [...(views[view] ?? []), ...items];
}
