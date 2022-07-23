import type { SbpmElementType, SbpmShapeType } from '@sbpmjs/shared';
import { processModelIcon } from '../icons';
import { writable } from 'svelte/store';

export type PaletteItem = {
  type: SbpmElementType;
  icon: string;
  size: {
    width: number;
    height: number;
  };
  title: string;
};

const processModelPaletteItem: PaletteItem = {
  type: 'ProcessModel',
  icon: processModelIcon,
  size: {
    width: 130,
    height: 70,
  },
  title: 'Process Model',
};

const PaletteItems: Record<SbpmShapeType | string, PaletteItem[]> = {
  defaultView: [processModelPaletteItem],
  // ProcessModel: ['Subject'],
  // MessageTransition: ['Message'],
  // Subject: ['SendState', 'ReceiveState', 'FunctionState'],
};

const views: Record<string, string[]> = {
  defaultView: [],
};

export const uiVisible = writable(true);

export const currentlySelectedSbpmShape = writable();

export const activePaletteItems = writable<PaletteItem[]>([processModelPaletteItem]);

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
