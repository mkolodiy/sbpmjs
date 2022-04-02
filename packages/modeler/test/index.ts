import { expect } from 'chai';
import * as joint from 'jointjs';
import SbpmModeler from '../src';

let container = null;

function createContainer() {
  container = document.createElement('div');
  document.body.appendChild(container);
}

function removeContainer() {
  document.body.removeChild(container);
  container = null;
}

describe('@sbpm/modeler', () => {
  describe('SbpmModeler', () => {
    beforeEach(() => {
      createContainer();
    });

    afterEach(() => {
      removeContainer();
    });

    it('should create a new instance', () => {
      const modeler = new SbpmModeler({ container });
      expect(modeler).to.not.be.null;
      expect(modeler).to.not.be.undefined;
      expect(modeler).to.be.instanceOf(SbpmModeler);
    });

    it('should throw error if container is undefined or null', () => {
      //@ts-ignore
      expect(() => new SbpmModeler()).to.throw('SbpmModeler: container is not provided');
      expect(() => new SbpmModeler({ container: document.getElementById('invalid-container') })).to.throw('SbpmModeler: container is not provided');
      expect(() => new SbpmModeler({ container: document.querySelector('#invalid-container') })).to.throw('SbpmModeler: container is not provided');
    });
  });

  describe('canvas', () => {
    beforeEach(() => {
      createContainer();
    });

    afterEach(() => {
      removeContainer();
    });

    it('should be present on the modeler instance', () => {
      const { canvas } = new SbpmModeler({ container });
      expect(canvas).to.not.be.null;
      expect(canvas).to.not.be.undefined;
    });

    it('should expose jointjs paper instance', () => {
      const {
        canvas: { paper },
      } = new SbpmModeler({ container });
      expect(paper).to.not.be.null;
      expect(paper).to.not.be.undefined;
      expect(paper).to.be.instanceOf(joint.dia.Paper);
    });

    it('should expose jointjs graph instance', () => {
      const { canvas } = new SbpmModeler({ container });
      const { graph } = canvas;
      expect(graph).to.not.be.null;
      expect(graph).to.not.be.undefined;
      expect(graph).to.be.instanceOf(joint.dia.Graph);
    });

    it('should expose getElements method', () => {
      const { canvas, factory } = new SbpmModeler({ container });

      expect(canvas.getElements().length).to.eq(0);

      const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
      const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });

      expect(canvas.getElements().length).to.eq(2);

      const firstEl = canvas.getElements()[0];
      const secondEl = canvas.getElements()[1];

      expect(firstEl.prop('id')).to.eq(processNetwork01.prop('id'));
      expect(firstEl.attr('label/text')).to.eq(processNetwork01.attr('label/text'));
      expect(firstEl.prop('position').x).to.eq(processNetwork01.prop('position').x);
      expect(firstEl.prop('position').y).to.eq(processNetwork01.prop('position').y);
      expect(secondEl.prop('id')).to.eq(processModel01.prop('id'));
      expect(secondEl.attr('label/text')).to.eq(processModel01.attr('label/text'));
      expect(secondEl.prop('position').x).to.eq(processModel01.prop('position').x);
      expect(secondEl.prop('position').y).to.eq(processModel01.prop('position').y);
    });
  });
});
