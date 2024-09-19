export function createIcon(template: string): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(template)}`;
}
