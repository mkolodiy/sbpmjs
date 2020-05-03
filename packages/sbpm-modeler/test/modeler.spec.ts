import { expect } from 'chai';
import Modeler from '../dist/modeler.es5';

describe('modeler', () => {
  it('should initialize properly', () => {
    const modeler = Modeler.initialize({
      container: document.createElement('div')
    });

    const { canvas, elementCreator, linkCreator } = modeler;
    expect(modeler).not.to.be.null;
    expect(canvas).not.to.be.null;
    expect(elementCreator).not.to.be.null;
    expect(linkCreator).not.to.be.null;
  });
});

describe('canvas', () => {
  let canvas;
  let elementCreator;
  let linkCreator;

  beforeEach(() => {
    const modeler = Modeler.initialize({
      container: document.createElement('div')
    });
    canvas = modeler.canvas;
    elementCreator = modeler.elementCreator;
    linkCreator = modeler.linkCreator;
  });

  afterEach(() => {
    canvas.clear();
  });

  it('should not be null', () => {
    const { graph, paper } = canvas;
    expect(canvas).not.to.be.null;
    expect(graph).not.to.be.null;
    expect(paper).not.to.be.null;
  });

  it('should have origin', () => {
    const { graph } = canvas;
    const allElements = graph
      .getElements()
      .filter(el => el.attributes.type.includes('sbpm.common'));
    expect(allElements).not.to.be.empty;
    expect(allElements.length).to.equal(1);
  });

  it('should return all elements', () => {
    elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 1')
    );
    elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 2')
    );
    const allElements = canvas.getElements();
    expect(allElements).not.to.be.empty;
    expect(allElements.length).to.equal(2);
  });

  it('should return all links', () => {
    const sub1 = elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 1')
    );
    const sub2 = elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 2')
    );
    const sub3 = elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 3')
    );
    linkCreator.addMessageTransition(
      createMessageTransitionOptions(sub1, sub2)
    );
    linkCreator.addMessageTransition(
      createMessageTransitionOptions(sub2, sub3)
    );
    const allLinks = canvas.getLinks();
    expect(allLinks).not.to.be.empty;
    expect(allLinks.length).to.equal(2);
  });

  it('should remove all shapes', () => {
    const sub1 = elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 1')
    );
    const sub2 = elementCreator.addStandardSubject(
      createStandardSubjectOptions('Test subject 2')
    );
    linkCreator.addMessageTransition(
      createMessageTransitionOptions(sub1, sub2)
    );
    let allElements = canvas.getElements();
    expect(allElements).not.to.be.empty;
    expect(allElements.length).to.equal(2);
    let allLinks = canvas.getLinks();
    expect(allLinks).not.to.be.empty;
    expect(allLinks.length).to.equal(1);
    canvas.clear();
    allElements = canvas.getElements();
    expect(allElements).to.be.empty;
    expect(allElements.length).to.equal(0);
    allLinks = canvas.getLinks();
    expect(allLinks).to.be.empty;
    expect(allLinks.length).to.equal(0);
  });

  it('should set to origin', () => {
    let translate = canvas.paper.translate();
    expect(translate.tx).to.equal(0);
    expect(translate.ty).to.equal(0);
    canvas.paper.translate(100, 200);
    translate = canvas.paper.translate();
    expect(translate.tx).to.equal(100);
    expect(translate.ty).to.equal(200);
    canvas.setToOrigin();
    translate = canvas.paper.translate();
    expect(translate.tx).to.equal(0);
    expect(translate.ty).to.equal(0);
  });
});

function createStandardSubjectOptions(description: string) {
  return {
    description,
    position: {
      x: 100,
      y: 100
    }
  };
}

function createMessageTransitionOptions(source, target) {
  return {
    source,
    target
  };
}
