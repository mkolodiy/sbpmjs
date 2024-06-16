import { SVG_PREFIX } from "./constants";
import type {
	SbpmItemNamespaceType,
	SbpmItemType,
	SbpmOriginType,
} from "./types";

export function createIcon(template: string) {
	return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: string[], separator = " ") {
	return strings.join(separator);
}

export function createJointType(
	namespace: SbpmItemNamespaceType,
	type: SbpmOriginType | SbpmItemType,
) {
	return `${namespace}.${type}`;
}

export function getSbpmItemType(type: string) {
	return type.split(".")[2];
}

export function isSbpmLinkType(type: SbpmItemType) {
	return type.includes("Transition");
}
