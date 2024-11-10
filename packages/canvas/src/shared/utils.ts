export function createIcon(template: string): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(template)}`;
}

export function isSbpmLinkType(type: string): boolean {
	return type.includes("Transition");
}
