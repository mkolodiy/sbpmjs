import Sbpm from '../src';

const containerIdentifier = 'container';

describe('Sbpm initialization', () => {
  it('should initialize without any errors ', () => {
    const containerElement = setUpContainerElement();
    new Sbpm('container');

    expect(containerElement.childNodes.length).toBe(1);

    const sbpmElement = containerElement.querySelector('.sbpm-container');
    expect(sbpmElement).not.toBeNull();
    expect(sbpmElement?.classList.length).toBe(1);
    expect(sbpmElement?.className).toBe('sbpm-container');
  });

  it('should throw an error if container identifier is not provided', () => {
    setUpContainerElement();
    // @ts-ignore
    const t = () => new Sbpm();
    expect(t).toThrow('Container identifier not defined. Please provide a valid container idenfier.');
  });

  it('should throw an error if container is not found', () => {
    setUpContainerElement();
    const t = () => new Sbpm('not-valid-container-id');
    expect(t).toThrow('Container element not found. Please provide a valid container idenfier.');
  });
});

function setUpContainerElement() {
  const containerElement = document.createElement('div');
  containerElement.id = containerIdentifier;
  document.body.appendChild(containerElement);
  return containerElement;
}
