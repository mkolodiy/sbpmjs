import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  container: document.getElementById('container')!,
  onSelectElement: (element) => {
    console.log('onSelectElement', element);
  },
  onSelectLink: (link) => {
    console.log('onSelectLink', link);
  },
  onDeleteElement: (element) => {
    console.log('onDeleteElement', element);
  },
  onDeleteLink: (link) => {
    console.log('onDeleteLink', link);
  },
  onOpenElement: (element) => {
    console.log('onOpenElement', element);
  },
  onOpenLink: (link) => {
    console.log('onOpenLink', link);
  },
});

document.getElementById('clear-canvas')?.addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas')?.addEventListener('click', () => {
  modeler.canvas.reset();
});

document.getElementById('restore-view')?.addEventListener('click', () => {
  // modeler.restoreView(view);
});
