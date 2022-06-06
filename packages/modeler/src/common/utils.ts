import { SVG_PREFIX } from './constants';
import type { SbpmShapeNamespaceKey, SbpmCommonTypeKey, SbpmElementTypeKey, SbpmLinkTypeKey } from './types';

export function createIcon(template: string) {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: string[], separator = ' ') {
  return strings.join(separator);
}

export function createJointType(namespace: SbpmShapeNamespaceKey, type: SbpmCommonTypeKey | SbpmElementTypeKey | SbpmLinkTypeKey) {
  return `${namespace}.${type}`;
}
