import Graph from 'graphology';
import { modeler } from './modeler';

const graph = new Graph();

graph.addNode('processNetwork01', {
  id: 'processNetwork01',
  label: 'Process network - Test',
  position: {
    x: 100,
    y: 100,
  },
  __type: 'ProcessNetwork',
});

graph.addNode('processModel01', {
  id: 'processModel01',
  label: 'Process model',
  position: {
    x: 600,
    y: 100,
  },
  __type: 'ProcessModel',
});

graph.addEdgeWithKey('processTransition01', 'processNetwork01', 'processModel01', {
  id: 'processTransition01',
  source: 'processNetwork01',
  target: 'processModel01',
  __type: 'ProcessTransition',
});

graph.addNode('subject01', {
  id: 'subject01',
  label: 'Subject 1',
  position: {
    x: 100,
    y: 100,
  },
  __type: 'Subject',
});

graph.addNode('subject02', {
  id: 'subject02',
  label: 'Subject 2',
  position: {
    x: 600,
    y: 100,
  },
  __type: 'Subject',
});

graph.addEdgeWithKey('messageTransition01', 'subject01', 'subject02', {
  id: 'messageTransition01',
  source: 'subject01',
  target: 'subject02',
  __type: 'MessageTransition',
});

console.log(graph.export());

const views: Record<string, string[]> = {
  defaultView: ['processNetwork01', 'processModel01', 'processTransition01'],
  processModel01: ['subject01', 'subject02', 'messageTransition01'],
};

export function openView(id: string) {
  modeler.canvas.clear();
  restoreView(id);
}

export function restoreView(view: string) {
  const ids = views[view];
  const elements = [];
  const links = [];

  ids.forEach((id) => {
    try {
      elements.push(graph.getNodeAttributes(id));
    } catch (e) {
      links.push(graph.getEdgeAttributes(id));
    }
  });

  console.log(elements);
  console.log(links);

  elements.forEach((element) => {
    const { __type, ...restOptions } = element;
    modeler.addElement(__type, restOptions);
  });

  links.forEach((element) => {
    const { __type, ...restOptions } = element;
    modeler.addLink(__type, {
      id: restOptions.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      source: modeler.canvas.graph.getCell(restOptions.source),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target: modeler.canvas.graph.getCell(restOptions.target),
    });
  });

  //   console.log(graph.getNodeAttributes('processNetwork01'));
  //   console.log(graph.getEdgeAttributes('processTransition01'));
  //   console.log(graph.source('processTransition01'));
  //   console.log(graph.target('processTransition01'));
}
