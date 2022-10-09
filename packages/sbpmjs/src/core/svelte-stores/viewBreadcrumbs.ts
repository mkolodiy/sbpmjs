import type { SbpmType, SbpmProcessItem } from '@sbpmjs/shared';
import { writable } from 'svelte/store';
import { defaultProcess } from '../common';
type ViewBreadcrumb = {
  type: SbpmType;
  id: string;
};

export const viewBreadcrumbs: ViewBreadcrumb[] = [];

export const defaultViewBreadcrumb = writable<SbpmProcessItem<'Process'>>(defaultProcess);

export function updateDefaultViewBreadcrumb(breadcrumb: SbpmProcessItem<'Process'>) {
  defaultViewBreadcrumb.update(() => breadcrumb);
}

export function addViewBreadcrumb(breadcrumb: ViewBreadcrumb) {
  viewBreadcrumbs.push(breadcrumb);
}

export function removeLastViewBreadcrumb() {
  viewBreadcrumbs.pop();
}

export function getLastViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 1];
}

export function getPreviousViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 2];
}
