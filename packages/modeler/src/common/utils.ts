import { SVG_PREFIX } from "./constants";

export function createIcon(template: string): string {
	return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: Array<string>, separator = " "): string {
	return strings.join(separator);
}
