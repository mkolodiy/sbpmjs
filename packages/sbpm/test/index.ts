// import { expect } from 'chai';
// import * as joint from 'jointjs';
// import SbpmModeler from '../src';
// // import SbpmModeler from '../dist/index';

// let container = null;

// function createContainer() {
//   container = document.createElement('div');
//   container.setAttribute('style', 'visibility:hidden;');
//   document.body.appendChild(container);
// }

// function removeContainer() {
//   document.body.removeChild(container);
//   container = null;
// }

// describe('@sbpm/modeler', () => {
//   describe('SbpmModeler', () => {
//     beforeEach(() => {
//       createContainer();
//     });

//     afterEach(() => {
//       removeContainer();
//     });

//     it('should create a new instance', () => {
//       const modeler = new SbpmModeler({ container });
//       expect(modeler).to.not.be.null;
//       expect(modeler).to.not.be.undefined;
//       expect(modeler).to.be.instanceOf(SbpmModeler);
//     });

//     it('should throw error if container is undefined or null', () => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(() => new SbpmModeler()).to.throw('Container is not provided');
//       expect(() => new SbpmModeler({ container: document.getElementById('invalid-container') })).to.throw('Container is not provided');
//       expect(() => new SbpmModeler({ container: document.querySelector('#invalid-container') })).to.throw('Container is not provided');
//     });
//   });

//   describe('canvas', () => {
//     beforeEach(() => {
//       createContainer();
//     });

//     afterEach(() => {
//       removeContainer();
//     });

//     it('should be present on the modeler instance', () => {
//       const { canvas } = new SbpmModeler({ container });
//       expect(canvas).to.not.be.null;
//       expect(canvas).to.not.be.undefined;
//     });

//     it('should expose jointjs paper instance', () => {
//       const {
//         canvas: { paper },
//       } = new SbpmModeler({ container });
//       expect(paper).to.not.be.null;
//       expect(paper).to.not.be.undefined;
//       expect(paper).to.be.instanceOf(joint.dia.Paper);
//     });

//     it('should expose jointjs graph instance', () => {
//       const { canvas } = new SbpmModeler({ container });
//       const { graph } = canvas;
//       expect(graph).to.not.be.null;
//       expect(graph).to.not.be.undefined;
//       expect(graph).to.be.instanceOf(joint.dia.Graph);
//     });

//     it('should expose getElements method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       expect(canvas.getElements().length).to.eq(0);

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });

//       expect(canvas.getElements().length).to.eq(2);

//       const firstEl = canvas.getElements()[0];
//       const secondEl = canvas.getElements()[1];

//       expect(firstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processNetwork01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processNetwork01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processNetwork01.prop('position').y);
//       expect(secondEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(secondEl.attr('label/text')).to.eq(processModel01.attr('label/text'));
//       expect(secondEl.prop('position').x).to.eq(processModel01.prop('position').x);
//       expect(secondEl.prop('position').y).to.eq(processModel01.prop('position').y);
//     });

//     it('should expose getLinks method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       expect(canvas.getLinks().length).to.eq(0);

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       const processNetwork02 = factory.addSbpmProcessNetwork({ id: 'process_network_2', label: 'process_network_2', position: { x: 300, y: 300 } });
//       const processModel02 = factory.addSbpmProcessModel({ id: 'process_model_2', label: 'process_model_2', position: { x: 400, y: 400 } });

//       expect(canvas.getLinks().length).to.eq(0);

//       const processNetworkTransition01 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });
//       const processNetworkTransition02 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_2',
//         source: processNetwork01,
//         target: processModel02,
//       });
//       const processNetworkTransition03 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_3',
//         source: processNetwork02,
//         target: processModel01,
//       });
//       const processNetworkTransition04 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_4',
//         source: processNetwork02,
//         target: processModel02,
//       });

//       expect(canvas.getLinks().length).to.eq(4);

//       const firstLink = canvas.getLinks()[0];
//       const secondLink = canvas.getLinks()[1];
//       const thirdLink = canvas.getLinks()[2];
//       const fourthLink = canvas.getLinks()[3];

//       expect(firstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(firstLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(firstLink.target().id).to.eq(processModel01.prop('id'));

//       expect(secondLink.prop('id')).to.eq(processNetworkTransition02.prop('id'));
//       expect(secondLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(secondLink.target().id).to.eq(processModel02.prop('id'));

//       expect(thirdLink.prop('id')).to.eq(processNetworkTransition03.prop('id'));
//       expect(thirdLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(thirdLink.target().id).to.eq(processModel01.prop('id'));

//       expect(fourthLink.prop('id')).to.eq(processNetworkTransition04.prop('id'));
//       expect(fourthLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(fourthLink.target().id).to.eq(processModel02.prop('id'));
//     });

//     it('should expose deselect method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       const processNetworkTransition01 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });

//       const processNetwork01View = canvas.paper.findViewByModel(processNetwork01);
//       const processModel01View = canvas.paper.findViewByModel(processModel01);
//       const processNetworkTransition01View = canvas.paper.findViewByModel(processNetworkTransition01);

//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       processNetwork01View.select();
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       processModel01View.select();
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       processNetworkTransition01View.select();

//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processNetwork01View._toolsView.tools.every((tool) => tool._visible)).to.be.true;
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processModel01View._toolsView.tools.every((tool) => tool._visible)).to.be.true;
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processNetworkTransition01View._toolsView.tools.every((tool) => tool._visible)).to.be.true;

//       canvas.deselect();

//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processNetwork01View._toolsView.tools.every((tool) => !tool._visible)).to.be.true;
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processModel01View._toolsView.tools.every((tool) => !tool._visible)).to.be.true;
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-ignore
//       expect(processNetworkTransition01View._toolsView.tools.every((tool) => !tool._visible)).to.be.true;
//     });

//     it('should expose reset method', () => {
//       const { canvas } = new SbpmModeler({ container });

//       canvas.paper.translate(100, 100);

//       expect(canvas.paper.translate().tx).to.eq(100);
//       expect(canvas.paper.translate().ty).to.eq(100);

//       canvas.reset();

//       expect(canvas.paper.translate().tx).to.eq(0);
//       expect(canvas.paper.translate().ty).to.eq(0);
//     });

//     it('should expose clear method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });
//       canvas.paper.translate(100, 100);

//       expect(canvas.paper.translate().tx).to.eq(100);
//       expect(canvas.paper.translate().ty).to.eq(100);
//       expect(canvas.getElements().length).to.eq(2);
//       expect(canvas.getLinks().length).to.eq(1);

//       canvas.clear();

//       expect(canvas.paper.translate().tx).to.eq(0);
//       expect(canvas.paper.translate().ty).to.eq(0);
//       expect(canvas.getElements().length).to.eq(0);
//       expect(canvas.getLinks().length).to.eq(0);
//     });
//   });

//   describe('factory', () => {
//     beforeEach(() => {
//       createContainer();
//     });

//     afterEach(() => {
//       removeContainer();
//     });

//     it('should expose addSbpmProcessNetwork method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processNetwork02 = factory.addSbpmProcessNetwork({ id: 'process_network_2', label: 'process_network_2', position: { x: 200, y: 200 } });
//       const processNetwork03 = factory.addSbpmProcessNetwork({ id: 'process_network_3', label: 'process_network_3', position: { x: 300, y: 300 } });

//       expect(canvas.getElements().length).to.eq(3);

//       const firstEl = canvas.getElements()[0];
//       const secondEl = canvas.getElements()[1];
//       const thirdEl = canvas.getElements()[2];

//       expect(firstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processNetwork01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processNetwork01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processNetwork01.prop('position').y);
//       expect(secondEl.prop('id')).to.eq(processNetwork02.prop('id'));
//       expect(secondEl.attr('label/text')).to.eq(processNetwork02.attr('label/text'));
//       expect(secondEl.prop('position').x).to.eq(processNetwork02.prop('position').x);
//       expect(secondEl.prop('position').y).to.eq(processNetwork02.prop('position').y);
//       expect(thirdEl.prop('id')).to.eq(processNetwork03.prop('id'));
//       expect(thirdEl.attr('label/text')).to.eq(processNetwork03.attr('label/text'));
//       expect(thirdEl.prop('position').x).to.eq(processNetwork03.prop('position').x);
//       expect(thirdEl.prop('position').y).to.eq(processNetwork03.prop('position').y);
//     });

//     it('should expose addSbpmProcessModel method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 100, y: 100 } });
//       const processModel02 = factory.addSbpmProcessModel({ id: 'process_model_2', label: 'process_model_2', position: { x: 200, y: 200 } });
//       const processModel03 = factory.addSbpmProcessModel({ id: 'process_model_3', label: 'process_model_3', position: { x: 300, y: 300 } });

//       expect(canvas.getElements().length).to.eq(3);

//       const firstEl = canvas.getElements()[0];
//       const secondEl = canvas.getElements()[1];
//       const thirdEl = canvas.getElements()[2];

//       expect(firstEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processModel01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processModel01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processModel01.prop('position').y);
//       expect(secondEl.prop('id')).to.eq(processModel02.prop('id'));
//       expect(secondEl.attr('label/text')).to.eq(processModel02.attr('label/text'));
//       expect(secondEl.prop('position').x).to.eq(processModel02.prop('position').x);
//       expect(secondEl.prop('position').y).to.eq(processModel02.prop('position').y);
//       expect(thirdEl.prop('id')).to.eq(processModel03.prop('id'));
//       expect(thirdEl.attr('label/text')).to.eq(processModel03.attr('label/text'));
//       expect(thirdEl.prop('position').x).to.eq(processModel03.prop('position').x);
//       expect(thirdEl.prop('position').y).to.eq(processModel03.prop('position').y);
//     });

//     it('should expose addSbpmProcessNetworkTransition method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       expect(canvas.getLinks().length).to.eq(0);

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       const processNetwork02 = factory.addSbpmProcessNetwork({ id: 'process_network_2', label: 'process_network_2', position: { x: 300, y: 300 } });
//       const processModel02 = factory.addSbpmProcessModel({ id: 'process_model_2', label: 'process_model_2', position: { x: 400, y: 400 } });

//       expect(canvas.getLinks().length).to.eq(0);

//       const processNetworkTransition01 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });
//       const processNetworkTransition02 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_2',
//         source: processNetwork01,
//         target: processModel02,
//       });
//       const processNetworkTransition03 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_3',
//         source: processNetwork02,
//         target: processModel01,
//       });
//       const processNetworkTransition04 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_4',
//         source: processNetwork02,
//         target: processModel02,
//       });

//       expect(canvas.getLinks().length).to.eq(4);

//       const firstLink = canvas.getLinks()[0];
//       const secondLink = canvas.getLinks()[1];
//       const thirdLink = canvas.getLinks()[2];
//       const fourthLink = canvas.getLinks()[3];

//       expect(firstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(firstLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(firstLink.target().id).to.eq(processModel01.prop('id'));

//       expect(secondLink.prop('id')).to.eq(processNetworkTransition02.prop('id'));
//       expect(secondLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(secondLink.target().id).to.eq(processModel02.prop('id'));

//       expect(thirdLink.prop('id')).to.eq(processNetworkTransition03.prop('id'));
//       expect(thirdLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(thirdLink.target().id).to.eq(processModel01.prop('id'));

//       expect(fourthLink.prop('id')).to.eq(processNetworkTransition04.prop('id'));
//       expect(fourthLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(fourthLink.target().id).to.eq(processModel02.prop('id'));
//     });

//     it('should expose updateElement method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });

//       const firstEl = canvas.getElements()[0];
//       const secondEl = canvas.getElements()[1];

//       expect(firstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processNetwork01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processNetwork01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processNetwork01.prop('position').y);
//       expect(secondEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(secondEl.attr('label/text')).to.eq(processModel01.attr('label/text'));
//       expect(secondEl.prop('position').x).to.eq(processModel01.prop('position').x);
//       expect(secondEl.prop('position').y).to.eq(processModel01.prop('position').y);

//       factory.updateElement(processNetwork01, { label: 'updated_process_network_1', position: { x: 200, y: 200 } });
//       factory.updateElement(processModel01, { label: 'updated_process_model_1', position: { x: 300, y: 300 } });

//       const updatedFirstEl = canvas.getElements()[0];
//       const updatedSecondEl = canvas.getElements()[1];

//       expect(updatedFirstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(updatedFirstEl.attr('label/text')).to.eq('updated_process_network_1');
//       expect(updatedFirstEl.prop('position').x).to.eq(200);
//       expect(updatedFirstEl.prop('position').y).to.eq(200);
//       expect(updatedSecondEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(updatedSecondEl.attr('label/text')).to.eq('updated_process_model_1');
//       expect(updatedSecondEl.prop('position').x).to.eq(300);
//       expect(updatedSecondEl.prop('position').y).to.eq(300);
//     });

//     it('should expose updateLink method', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       const processNetwork02 = factory.addSbpmProcessNetwork({ id: 'process_network_2', label: 'process_network_2', position: { x: 300, y: 300 } });
//       const processModel02 = factory.addSbpmProcessModel({ id: 'process_model_2', label: 'process_model_2', position: { x: 400, y: 400 } });

//       const processNetworkTransition01 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });
//       const processNetworkTransition02 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_2',
//         source: processNetwork01,
//         target: processModel02,
//       });
//       const processNetworkTransition03 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_3',
//         source: processNetwork02,
//         target: processModel01,
//       });
//       const processNetworkTransition04 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_4',
//         source: processNetwork02,
//         target: processModel02,
//       });

//       const firstLink = canvas.getLinks()[0];
//       const secondLink = canvas.getLinks()[1];
//       const thirdLink = canvas.getLinks()[2];
//       const fourthLink = canvas.getLinks()[3];

//       expect(firstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(firstLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(firstLink.target().id).to.eq(processModel01.prop('id'));

//       expect(secondLink.prop('id')).to.eq(processNetworkTransition02.prop('id'));
//       expect(secondLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(secondLink.target().id).to.eq(processModel02.prop('id'));

//       expect(thirdLink.prop('id')).to.eq(processNetworkTransition03.prop('id'));
//       expect(thirdLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(thirdLink.target().id).to.eq(processModel01.prop('id'));

//       expect(fourthLink.prop('id')).to.eq(processNetworkTransition04.prop('id'));
//       expect(fourthLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(fourthLink.target().id).to.eq(processModel02.prop('id'));

//       factory.updateLink(processNetworkTransition01, { source: processNetwork02, target: processModel02 });
//       factory.updateLink(processNetworkTransition02, { source: processNetwork02, target: processModel01 });
//       factory.updateLink(processNetworkTransition03, { source: processNetwork01, target: processModel02 });
//       factory.updateLink(processNetworkTransition04, { source: processNetwork01, target: processModel01 });

//       const updatedFirstLink = canvas.getLinks()[0];
//       const updatedSecondLink = canvas.getLinks()[1];
//       const updatedThirdLink = canvas.getLinks()[2];
//       const updatedFourthLink = canvas.getLinks()[3];

//       expect(updatedFirstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(updatedFirstLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(updatedFirstLink.target().id).to.eq(processModel02.prop('id'));

//       expect(updatedSecondLink.prop('id')).to.eq(processNetworkTransition02.prop('id'));
//       expect(updatedSecondLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(updatedSecondLink.target().id).to.eq(processModel01.prop('id'));

//       expect(updatedThirdLink.prop('id')).to.eq(processNetworkTransition03.prop('id'));
//       expect(updatedThirdLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(updatedThirdLink.target().id).to.eq(processModel02.prop('id'));

//       expect(updatedFourthLink.prop('id')).to.eq(processNetworkTransition04.prop('id'));
//       expect(updatedFourthLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(updatedFourthLink.target().id).to.eq(processModel01.prop('id'));
//     });
//   });

//   describe('shapes', () => {
//     beforeEach(() => {
//       createContainer();
//     });

//     afterEach(() => {
//       removeContainer();
//     });

//     it('should have update method on SbpmProcessNetwork element', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });

//       const firstEl = canvas.getElements()[0];

//       expect(firstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processNetwork01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processNetwork01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processNetwork01.prop('position').y);

//       processNetwork01.update({ label: 'updated_process_network_1', position: { x: 200, y: 200 } });

//       const updatedFirstEl = canvas.getElements()[0];

//       expect(updatedFirstEl.prop('id')).to.eq(processNetwork01.prop('id'));
//       expect(updatedFirstEl.attr('label/text')).to.eq('updated_process_network_1');
//       expect(updatedFirstEl.prop('position').x).to.eq(200);
//       expect(updatedFirstEl.prop('position').y).to.eq(200);
//     });

//     it('should have update method on SbpmProcessModel element', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 100, y: 100 } });

//       const firstEl = canvas.getElements()[0];

//       expect(firstEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(firstEl.attr('label/text')).to.eq(processModel01.attr('label/text'));
//       expect(firstEl.prop('position').x).to.eq(processModel01.prop('position').x);
//       expect(firstEl.prop('position').y).to.eq(processModel01.prop('position').y);

//       processModel01.update({ label: 'updated_process_model_1', position: { x: 200, y: 200 } });

//       const updatedFirstEl = canvas.getElements()[0];

//       expect(updatedFirstEl.prop('id')).to.eq(processModel01.prop('id'));
//       expect(updatedFirstEl.attr('label/text')).to.eq('updated_process_model_1');
//       expect(updatedFirstEl.prop('position').x).to.eq(200);
//       expect(updatedFirstEl.prop('position').y).to.eq(200);
//     });

//     it('should have update method on SbpmProcessNetworkTransition element', () => {
//       const { canvas, factory } = new SbpmModeler({ container });

//       const processNetwork01 = factory.addSbpmProcessNetwork({ id: 'process_network_1', label: 'process_network_1', position: { x: 100, y: 100 } });
//       const processModel01 = factory.addSbpmProcessModel({ id: 'process_model_1', label: 'process_model_1', position: { x: 200, y: 200 } });
//       const processNetwork02 = factory.addSbpmProcessNetwork({ id: 'process_network_2', label: 'process_network_2', position: { x: 300, y: 300 } });
//       const processModel02 = factory.addSbpmProcessModel({ id: 'process_model_2', label: 'process_model_2', position: { x: 400, y: 400 } });

//       const processNetworkTransition01 = factory.addSbpmProcessNetworkTransition({
//         id: 'process_network_transition_1',
//         source: processNetwork01,
//         target: processModel01,
//       });

//       const firstLink = canvas.getLinks()[0];

//       expect(firstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(firstLink.source().id).to.eq(processNetwork01.prop('id'));
//       expect(firstLink.target().id).to.eq(processModel01.prop('id'));

//       processNetworkTransition01.update({ source: processNetwork02, target: processModel02 });

//       const updatedFirstLink = canvas.getLinks()[0];

//       expect(updatedFirstLink.prop('id')).to.eq(processNetworkTransition01.prop('id'));
//       expect(updatedFirstLink.source().id).to.eq(processNetwork02.prop('id'));
//       expect(updatedFirstLink.target().id).to.eq(processModel02.prop('id'));
//     });
//   });
// });
