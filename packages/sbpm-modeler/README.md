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
// - elementCreator: create new elements
// - linkCreator: create connections between elements
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

// Create a message connection between subjects
linkCreator.addMessageTransition({
  source: subject1,
  target: subject2
});
```

Output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/sbpmjs/master/packages/sbpm-modeler/assets/example.PNG" alt="Example application" />
</p>
