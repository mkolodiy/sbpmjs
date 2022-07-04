# `@sbpmjs/modeler`

A library for working with SBPM constructs.

## Installation

```
npm install @sbpmjs/modeler
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
import SbpmModeler from '@sbpmjs/modeler';

// Create a new instance of the SbpmModeler
const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

// Create a new element, e.g. process network
const processNetwork = modeler.addElement('ProcessNetwork', {
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});

// Create a new element, e.g. process model
const processModel = modeler.addElement('ProcessModel', {
  label: 'Test',
  position: {
    x: 700,
    y: 100,
  },
});

// Create a new link, e.g. process transition between process network and process model
const processTransition = modeler.addLink('ProcessTransition', {
  source: processNetwork,
  target: processModel,
});
```

Output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/sbpmjs/master/packages/modeler/assets/basic-example.png" alt="Basic usage" />
</p>

## API

- [`SbpmModeler`](#sbpmmodeler)
  - [`SbpmModeler.createElement`](#sbpmmodelercreateelement)
  - [`SbpmModeler.createLink`](#sbpmmodelercreatelink)
  - [`SbpmModeler.addElement`](#sbpmmodeleraddelement)
  - [`SbpmModeler.addLink`](#sbpmmodeleraddlink)
  - [`SbpmModeler.updateElement`](#sbpmmodelerupdateelement)
  - [`SbpmModeler.updateLink`](#sbpmmodelerupdatelink)
  - [`SbpmModeler.canvas`](#sbpmmodelercanvas)
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
import SbpmModeler from '@sbpmjs/modeler';

// Types
import type {
  SbpmModelerOptions,
  SbpmProcessNetworkOptions,
  SbpmProcessModelOptions,
  SbpmProcessTransitionOptions,
  SbpmSubjectOptions,
  SbpmMessageOptions,
  SbpmMessageTransitionOptions,
  SbpmSendStateOptions,
  SbpmSendStateTransitionOptions,
  SbpmReceiveStateOptions,
  SbpmReceiveStateTransitionOptions,
  SbpmFunctionStateOptions,
  SbpmFunctionStateTransitionOptions,
} from '@sbpmjs/modeler';
```

A new SBPM modeler can be created as following:

```ts
import SbpmModeler from '@sbpmjs/modeler';
import type { SbpmModelerOptions } from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
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
});
```

#### `SbpmModeler.createElement`

Create a new element.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element = modeler.createElement('ProcessNetwork', {
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});
```

#### `SbpmModeler.createLink`

Create a new link.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = modeler.createLink('ProcessTransition', {
  source: processNetwork,
  target: processModel,
});
```

#### `SbpmModeler.addElement`

Create a new element add it to the canvas.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element = modeler.addElement('ProcessNetwork', {
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});
```

#### `SbpmModeler.addLink`

Create a new link and add it to the canvas.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = modeler.addLink('ProcessTransition', {
  source: processNetwork,
  target: processModel,
});
```

#### `SbpmModeler.updateElement`

Update an element.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element = modeler.createElement('ProcessNetwork', {
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});

modeler.updateElement(element, {
  label: 'New label',
});
```

#### `SbpmModeler.updateLink`

Create a new element.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

// Create a process network and a process model

const link = modeler.createLink('ProcessTransition', {
  source: processNetwork,
  target: processModel,
});

// Create another process network

modeler.updateLink(link, {
  source: anotherProcessNetwork,
});
```

#### `SbpmModeler.canvas`

Get the canvas instance.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const canvas = modeler.canvas;
```

### `SbpmCanvas`

#### `SbpmCanvas.paper`

Get the jointjs paper instance.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const paper = modeler.canvas.paper;
```

#### `SbpmCanvas.graph`

Get the jointjs graph instance.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const graph = modeler.canvas.graph;
```

#### `SbpmCanvas.getElements`

Get all elements that are present on the canvas.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const elements = modeler.canvas.getElements();
```

#### `SbpmCanvas.getLinks`

Get all links that are present on the canvas.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const links = modeler.canvas.getLinks();
```

#### `SbpmCanvas.deselect`

Remove selection from all shapes on the canvas.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

modeler.canvas.deselect();
```

#### `SbpmCanvas.reset`

Set the origin to 0/0.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

modeler.canvas.reset();
```

#### `SbpmCanvas.clear`

Remove all shapes from the canvas and set the origin to 0/0.

```ts
import SbpmModeler from '@sbpmjs/modeler';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

modeler.canvas.clear();
```

## License

Released under MIT license.
