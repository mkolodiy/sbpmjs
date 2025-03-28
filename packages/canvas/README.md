# `@sbpmjs/canvas`

A library for working with SBPM constructs.

## Installation

```
npm install @sbpmjs/canvas
```

## Available SBPM constructs

- Process network
- Process model
- Process transition
- Subject
- Message
- Message transition
- Send state
- Send state transition
- Receive state
- Receive state transition
- Function state
- Function state transition

## Basic example

```
import { SbpmCanvas } from '@sbpmjs/canvas';

// Create a new instance of the SbpmModeler
const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

// Create a new element, e.g. process network
const processNetwork = canvas.createSbpmElement({
  type: 'ProcessNetwork',
  properties: {
    id: 'processNetwork',
    label: 'Test process network',
    position: {
      x: 100,
      y: 100,
    },
  },
});

// Create a new element, e.g. process model
const processModel = canvas.createSbpmElement({
  type: 'ProcessModel',
  properties: {
    id: 'processModel',
    label: 'Test process model',
    position: {
      x: 100,
      y: 100,
    },
  },
});

// Create a new link, e.g. process transition between process network and process model
const processTransition = canvas.createSbpmLink({
  type: 'ProcessTransition',
  properties: {
    source: 'processNetwork',
    target: 'processModel',
  },
});
```

Output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/sbpmjs/master/packages/modeler/assets/basic-example.png" alt="Basic usage" />
</p>

## API

- [`SbpmModeler`](#sbpmmodeler)
  - [`Sbpmcanvas.createElement`](#sbpmmodelercreateelement)
  - [`Sbpmcanvas.createLink`](#sbpmmodelercreatelink)
  - [`Sbpmcanvas.addElement`](#sbpmmodeleraddelement)
  - [`Sbpmcanvas.addLink`](#sbpmmodeleraddlink)
  - [`Sbpmcanvas.updateElement`](#sbpmmodelerupdateelement)
  - [`Sbpmcanvas.updateLink`](#sbpmmodelerupdatelink)
  - [`Sbpmcanvas.canvas`](#sbpmmodelercanvas)
- [`SbpmCanvas`](#sbpmmodeler)
  - [`SbpmCanvas.paper`](#sbpmcanvaspaper)
  - [`SbpmCanvas.graph`](#sbpmcanvasgraph)
  - [`SbpmCanvas.getElements`](#sbpmcanvasgetelements)
  - [`SbpmCanvas.getLinks`](#sbpmcanvasgetlinks)
  - [`SbpmCanvas.deselect`](#sbpmcanvasdeselect)
  - [`SbpmCanvas.reset`](#sbpmcanvasreset)
  - [`SbpmCanvas.clear`](#sbpmcanvasclear)

### `SbpmModeler`

The module export.

```ts
// Main class
import SbpmModeler from '@sbpmjs/canvas';

// Types
import type { SbpmModelerOptions } from '@sbpmjs/canvas';
```

A new SBPM modeler can be created as following:

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
  onSelectElement: (element) => {
    // React when an element is selected
  },
  onSelectLink: (link) => {
    // React when a link is selected
  },
  onDeleteElement: (element) => {
    // React when an element is deleted
  },
  onDeleteLink: (link) => {
    // React when a link is deleted
  },
  onOpenElement: (element) => {
    // React when an element is opened
  },
  onOpenLink: (link) => {
    // React when a link is opened
  },
  onConnectLink: (link) => {
    // React when a link connected
  },
  onClickCanvas: () => {
    // React when there is a click on the canvas
  },
});
```

#### `Sbpmcanvas.createSbpmElement`

Create a new element.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const element = canvas.createSbpmElement({
  type: 'ProcessNetwork',
  properties: {
    label: 'Test process network',
    position: {
      x: 100,
      y: 100,
    },
  },
});
```

#### `Sbpmcanvas.createSbpmLink`

Create a new link.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = canvas.createSbpmLink({
  type: 'ProcessTransition',
  properties: {
    source: 'processNetwork',
    target: 'processModel',
  },
});
```

#### `Sbpmcanvas.addSbpmElement`

Create a new element add it to the canvas.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const element = canvas.addSbpmElement({
  type: 'ProcessNetwork',
  properties: {
    label: 'Test process network',
    position: {
      x: 100,
      y: 100,
    },
  },
});
```

#### `Sbpmcanvas.addSbpmLink`

Create a new link and add it to the canvas.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = canvas.addSbpmLink({
  type: 'ProcessTransition',
  properties: {
    source: 'processNetwork',
    target: 'processModel',
  },
});
```

#### `Sbpmcanvas.updateSbpmElement`

Update an element.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const element = canvas.addSbpmElement({
  type: 'ProcessNetwork',
  properties: {
    label: 'Test process network',
    position: {
      x: 100,
      y: 100,
    },
  },
});

// Update using the modeler instance:

canvas.updateSbpmElement(element, {
  label: 'New label',
});

// Update using the element instance:
element.update({
  label: 'New label',
});
```

#### `Sbpmcanvas.updateSbpmLink`

Create a new element.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = canvas.addSbpmLink({
  type: 'ProcessTransition',
  properties: {
    source: 'processNetwork',
    target: 'processModel',
  },
});

// Update using the modeler instance:

canvas.updateSbpmLink(link, {
  source: 'anotherProcessNetwork',
});

// Update using the link instance:
link.update({
  source: 'anotherProcessNetwork',
});
```

#### `Sbpmcanvas.canvas`

Get the canvas instance.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const canvas = canvas.canvas;
```

### `SbpmCanvas`

#### `SbpmCanvas.paper`

Get the jointjs paper instance.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const paper = canvas.canvas.paper;
```

#### `SbpmCanvas.graph`

Get the jointjs graph instance.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const graph = canvas.canvas.graph;
```

#### `SbpmCanvas.getElements`

Get all elements that are present on the canvas.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const elements = canvas.canvas.getElements();
```

#### `SbpmCanvas.getLinks`

Get all links that are present on the canvas.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

const links = canvas.canvas.getLinks();
```

#### `SbpmCanvas.deselect`

Remove selection from all shapes on the canvas.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

canvas.canvas.deselect();
```

#### `SbpmCanvas.reset`

Set the origin to 0/0.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

canvas.canvas.reset();
```

#### `SbpmCanvas.clear`

Remove all shapes from the canvas and set the origin to 0/0.

```ts
import SbpmModeler from '@sbpmjs/canvas';

const canvas = new SbpmCanvas({
  container: document.getElementById('container'),
});

canvas.canvas.clear();
```

## License

Released under MIT license.
