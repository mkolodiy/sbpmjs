export const store: Record<string, any> = {};

export const views: Record<string, string[]> = {
  defaultView: [],
};

export function loadProcess(process: any[]) {
  process.forEach((item) => {
    store[item.id] = item;

    if (item.type === 'ProcessNetwork' || item.type === 'ProcessModel' || item.type === 'ProcessTransition') {
      views.defaultView = [...views.defaultView, item.id];
    }

    if ('contains' in item) {
      views[item.id] = item.contains;
    }
  });
  console.log(store);
  console.log(views);
}
