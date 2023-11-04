import type {
  SbpmBasicItem,
  SbpmElementItem,
  SbpmElementType,
  SbpmLinkItem,
  SbpmLinkType,
  SbpmItemType as SbpmItemTypeModeler,
  SbpmItem as SbpmItemModeler,
} from '@sbpmjs/modeler';
import type { SbpmProcessItemGroup } from '@sbpmjs/shared';

export type SbpmProcessType = 'Process';

export type SbpmItemType = SbpmItemTypeModeler | SbpmProcessType;

export interface SbpmContainerShape {
  contains: string[];
}

export interface SbpmProcess extends SbpmBasicItem, SbpmContainerShape {}

export type SbpmProcessItem = {
  type: SbpmProcessType;
  properties: SbpmProcess;
};

export type SbpmItem<T = SbpmItemType> = T extends SbpmProcessType ? SbpmProcess : SbpmItemModeler<T>;

export type SbpmItemGroup<T = SbpmItemType> = Array<SbpmItem<T>>;

declare module '@sbpmjs/modeler' {
  interface SbpmProcessModel extends SbpmContainerShape {}
  interface SbpmSubject extends SbpmContainerShape {}
  interface SbpmMessageTransition extends SbpmContainerShape {}
}

export function createSbpmProcessItem(item: SbpmProcessItem) {
  return item;
}

export function createSbpmElementItem<Type extends SbpmElementType = SbpmElementType>(item: SbpmElementItem<Type>) {
  return item;
}

export function createSbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType>(item: SbpmLinkItem<Type>) {
  return item;
}

export function createSbpmItem<T>(item: SbpmItem<T>) {
  return item;
}

export function createSbpmItemGroup<T>(item: SbpmItemGroup<T>) {
  return item;
}
