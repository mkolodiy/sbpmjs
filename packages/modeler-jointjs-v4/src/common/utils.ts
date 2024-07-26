import { SVG_PREFIX } from "./constants";

export function createIcon(template: string) {
	return `${SVG_PREFIX}${encodeURIComponent(template)}`;
}

export function combineStrings(strings: string[], separator = " ") {
	return strings.join(separator);
}
