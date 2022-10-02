import type { SbpmShapeType } from '@sbpmjs/shared';
import { SVG_PREFIX } from './constants';
import type { SbpmOriginType, SbpmShapeNamespaceType } from './types';

export function createIcon(template: string) {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: string[], separator = ' ') {
  return strings.join(separator);
}

export function createJointType(namespace: SbpmShapeNamespaceType, type: SbpmOriginType | SbpmShapeType) {
  return `${namespace}.${type}`;
}

export function getSbpmShapeType(type: string) {
  return type.split('.')[2];
}
