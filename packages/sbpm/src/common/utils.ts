export function createRandomUUID() {
  return crypto.randomUUID();
}

export function createIcon(template: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(template)}`;
}
