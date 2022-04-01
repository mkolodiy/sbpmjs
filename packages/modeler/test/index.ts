import { expect } from 'chai';
import SbpmModeler from '../src';

describe('Test lib init', () => {
  it('passes', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { canvas } = new SbpmModeler({ container: div });

    expect(canvas.graph.getElements().length).to.eq(1);
    expect(canvas.getElements().length).to.eq(0);

    document.body.removeChild(div);
  });
});
