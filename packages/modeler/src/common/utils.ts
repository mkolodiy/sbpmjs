import { SVG_PREFIX } from './constants';
import type { SbpmShapeNamespaceType, SbpmShapeType } from './types';

export function createIcon(template: string) {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: string[], separator = ' ') {
  return strings.join(separator);
}

export function createJointType(namespace: SbpmShapeNamespaceType, type: SbpmShapeType) {
  return `${namespace}.${type}`;
}

export function getSbpmShapeType(type: string) {
  return type.split('.')[2];
}

export function isSbpmLinkType(type: SbpmShapeType) {
  return type.includes('Transition');
}
