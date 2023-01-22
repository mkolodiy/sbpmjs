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

export function removeView(view: string) {
  if (view in views) {
    delete views[view];
  }
}

export function removeViews(views: string[]) {
  views.forEach((view) => removeView(view));
}

export function removeItemFromView(view: string, item: string) {
  views[view] = views[view].filter((i) => i !== item);
}

export function getAllChildrenForView(view: string) {
  const allChildren = new Set<string>();

  const collectChildren = (view: string) => {
    const children = views[view];
    if (Array.isArray(children)) {
      children.forEach((child) => {
        allChildren.add(child);
        collectChildren(child);
      });
    }
  };

  collectChildren(view);
  return Array.from(allChildren);
}

export function removeItem(item: string) {
  for (const [key, value] of Object.entries(views)) {
    if (value.includes(item)) {
      removeItemFromView(key, item);
      break;
    }
  }
}
