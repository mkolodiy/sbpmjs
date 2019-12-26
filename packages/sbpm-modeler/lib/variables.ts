export enum Errors {
  INITIALIZATION = 'Modeler is already initialized. Please use Modeler.getInstance() method to retrieved the modeler instance.',
  INSTANCE_RETRIEVAL = 'Modeler is not initialized. Please use Modeler.initialize() method to create a new instance of the modeler.',
  INVALID_MODELER_OPTIONS = 'Please provide valid modeler options.'
}

export enum ShapeTypes {
  ORIGIN = 'sbpm.common.Origin'
}
