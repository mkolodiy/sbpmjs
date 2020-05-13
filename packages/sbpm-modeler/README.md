# `@sbpmjs/modeler`

A library for modeling SBPM processes.

## Installation

```
npm install @sbpmjs/modeler
```

## Basic example

```
import Modeler from '@sbpmjs/modeler';
// const modeler = require('@sbpmjs/modeler');

// Create a new Modeler instance
const modeler = new Modeler({
  container: document.querySelector('.sbpmjs')
});

// Following object are available:
// - canvas: interaction with canvas
// - elementCreator: create new elements or update an existing one
// - linkCreator: create links between elements or update an existing one
const { canvas, elementCreator, linkCreator } = modeler;

// Create a new subject
const subject1 = elementCreator.addStandardSubject({
  description: 'Standard subject 1',
  position: {
    x: 100,
    y: 100
  }
});

// Create a new subject
const subject2 = elementCreator.addStandardSubject({
  description: 'Standard subject 2',
  position: {
    x: 600,
    y: 100
  }
});

// Create a new message transition
const message1 = linkCreator.addMessageTransition({
  source: subject1,
  target: subject2
});
```

Output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/sbpmjs/master/packages/sbpm-modeler/assets/usage-basic-example.PNG" alt="Example application" />
</p>

## Available SBPM objects

## API Overview

```
import Modeler from '@sbpmjs/modeler';
// const modeler = require('@sbpmjs/modeler');

// Create a new Modeler instance
const modeler = new Modeler({
  container: document.querySelector('.sbpmjs')
});

// Following object are available:
// - canvas: interaction with canvas
// - elementCreator: create new elements or update an existing one
// - linkCreator: create links between elements or update an existing one
const { canvas, elementCreator, linkCreator } = modeler;

// Create a new subject
const subject = elementCreator.addStandardSubject(options);

// Create a new send state
const sendState = elementCreator.addSendState(options);

// Create a new receive state
const sendState = elementCreator.addReceiveState(options);

// Create a new function state
const sendState = elementCreator.addFunctionState(options);

// Create a new message transition
const message = linkCreator.addMessageTransition(options);

// Create a new send state transition
const sendStateTransition = linkCreator.addSendStateTransition(options);

// Create a new receive state transition
const receiveStateTransition = linkCreator.addReceiveStateTransition(options);

// Create a new function state transition
const functionStateTransition = linkCreator.addFunctionStateTransition(options);

// Update currently selected element
elementCreator.updateCurrentlySelectedElement(options);

// Update currently selected link
linkCreator.updateCurrentlySelectedLink(options);

// Register onClick event for an element
canvas.onElementSelected(callbackFuntion);

// Register onClick event for a link
canvas.onLinkSelected(callbackFuntion);
```

##### For more info check out:

- Example application
- API docs

## Dependencies

- Jointjs ([License](https://github.com/clientIO/joint/blob/master/LICENSE))

## License

Released under MIT license.
