let views: Record<string, string[]> = {};

export function getViews() {
  return views;
}

export function resetViews() {
  views = {};
}

export function getOrCreateView(view: string) {
  const viewItems = views[view];
  if (!viewItems) {
    updateView(view, []);
  }
  return views[view];
}

export function updateView(view: string, items: string[]) {
  views[view] = [...(views[view] ?? []), ...items];
}
