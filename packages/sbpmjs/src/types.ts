import type { SbpmBasicItem, SbpmItem as SbpmItemModeler, SbpmItemType as SbpmItemTypeModeler } from '@sbpmjs/modeler';

export type SbpmProcessType = 'Process';

export interface SbpmContainerShape {
  contains: string[];
}

export interface SbpmProcess extends SbpmBasicItem, SbpmContainerShape {}

export interface SbpmProcessItem {
  type: SbpmProcessType;
  properties: SbpmProcess;
}

declare module '@sbpmjs/modeler' {
  interface SbpmProcessModel extends SbpmContainerShape {}
  interface SbpmSubject extends SbpmContainerShape {}
  interface SbpmMessageTransition extends SbpmContainerShape {}
}

type SbpmItemType = SbpmProcessType | SbpmItemTypeModeler;

export type SbpmItem<Type extends SbpmItemType = SbpmItemType> = Type extends SbpmProcessType
  ? SbpmProcessItem
  : Type extends SbpmItemTypeModeler
    ? SbpmItemModeler<Type>
    : undefined;

export type SbpmItemGroup<Type extends SbpmItemType = SbpmItemType> = Array<SbpmItem<Type>>;

export function createSbpmProcessItem(item: SbpmProcessItem) {
  return item;
}

export function createSbpmItem<Type extends SbpmItemType = SbpmItemType>(item: SbpmItem<Type>) {
  return item;
}

export function createSbpmItemGroup<Type extends SbpmItemType = SbpmItemType>(item: SbpmItemGroup<Type>) {
  return item;
}
