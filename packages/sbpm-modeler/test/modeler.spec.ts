import { expect } from 'chai';
import Modeler from '../dist/modeler.es5';

describe('Basic Test', () => {
  it('Test 1', () => {
    const container = document.createElement('div');
    container.id = 'sbpmjs';
    const modeler = Modeler.initialize({
      container: container
    });

    modeler.elementCreator.addStandardSubject({
      description: 'test',
      position: {
        x: 100,
        y: 100
      }
    });
    const elements = modeler.canvas.getElements();
    console.log(elements[0].attributes.type);
    console.log(elements[1].attributes.type);
    expect('test').to.equal('test');
  });
});
