test('TODO', () => {
  expect('test').toBe('test');
});

// import { ModelerOptions } from '../lib/types';
// import { Errors } from '../lib/variables';

// beforeEach(() => {
//   jest.resetModules();
// });

// test('Modeler instance should be created correctly', async () => {
//   const modelerImport = await import('../lib/modeler');
//   const Modeler = modelerImport.default;
//   const modelerInstance1 = Modeler.initialize(createModelerOptions());
//   expect(modelerInstance1).not.toBeUndefined();
//   expect(modelerInstance1).not.toBeNull();
//   expect(modelerInstance1).toBeInstanceOf(Modeler);

//   const modelerInstance2 = Modeler.getInstance();
//   expect(modelerInstance2).not.toBeUndefined();
//   expect(modelerInstance2).not.toBeNull();
//   expect(modelerInstance2).toBeInstanceOf(Modeler);
// });

// test('Invalid modeler options should result in an error', async () => {
//   const modelerImport = await import('../lib/modeler');
//   const Modeler = modelerImport.default;
//   let invalidOptions = null;
//   expect(() => Modeler.initialize(invalidOptions)).toThrow(
//     Errors.INVALID_MODELER_OPTIONS
//   );
//   invalidOptions = undefined;
//   expect(() => Modeler.initialize(invalidOptions)).toThrow(
//     Errors.INVALID_MODELER_OPTIONS
//   );
//   invalidOptions = {};
//   expect(() => Modeler.initialize(invalidOptions)).toThrow(
//     Errors.INVALID_MODELER_OPTIONS
//   );
// });

// test('Initializing modeler instance a second time should result in an error', async () => {
//   const modelerImport = await import('../lib/modeler');
//   const Modeler = modelerImport.default;
//   const modelerInstance1 = Modeler.initialize(createModelerOptions());
//   expect(modelerInstance1).not.toBeUndefined();
//   expect(modelerInstance1).not.toBeNull();
//   expect(modelerInstance1).toBeInstanceOf(Modeler);
//   expect(() => Modeler.initialize(createModelerOptions())).toThrow(
//     Errors.INITIALIZATION
//   );
// });

// test('Retrieval of modeler instance that was not yet initialized should result in an error', async () => {
//   const modelerImport = await import('../lib/modeler');
//   const Modeler = modelerImport.default;
//   expect(() => Modeler.getInstance()).toThrow(Errors.INSTANCE_RETRIEVAL);
// });

// /* Helper Methods */

// const createContainerElWithId = (): Element => {
//   const containerEl = document.createElement('div');
//   containerEl.id = 'someContainerId';
//   document.body.appendChild(containerEl);
//   return containerEl;
// };

// const createModelerOptions = (): ModelerOptions => {
//   return {
//     el: createContainerElWithId()
//   };
// };
