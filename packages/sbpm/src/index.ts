import TestComponent from './TestComponent.svelte';

interface ExampleObj {
  message1: string;
  message2: string;
}

const testObj: Partial<ExampleObj> = {};

class AccessTracker<T extends object> {
  accessedProperties: string[];
  objectToTrack: Partial<T>;

  constructor(objectToTrack: Partial<T>) {
    this.accessedProperties = [];
    this.objectToTrack = this.registerProxy(objectToTrack);
  }

  private registerProxy(target: Partial<T>) {
    const handler = {
      get: (target: T, prop: string) => {
        console.log(typeof prop);

        this.accessedProperties.push(prop);
        return Reflect.get(target, prop);
      },
    };

    return new Proxy(target, handler);
  }

  public getTrackedObject() {
    return this.objectToTrack;
  }

  public getAccessedProperties() {
    return this.accessedProperties;
  }
}

const accessTracker = new AccessTracker<ExampleObj>(testObj);

export default function testLib(containerId: string) {
  const containerEl = document.getElementById(containerId);
  if (containerEl) {
    containerEl.textContent = 'Test lib';
  }
  console.log('Access property', accessTracker.getTrackedObject().message1);
  console.log('Access property', accessTracker.getTrackedObject().message2);
  console.log(
    'Accessed properies array',
    accessTracker.getAccessedProperties()
  );

  new TestComponent({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target: containerEl,
  });
}
