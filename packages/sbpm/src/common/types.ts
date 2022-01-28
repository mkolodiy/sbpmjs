export type SbpmLayerType = 'SBPM_STANDARD_LAYER' | 'SBPM_EXTENSION_LAYER' | 'SBPM_ABSTRACT_LAYER';

export type ProcessGroupType = 'SBPM_PROCESS_GROUP';

export type ProcessModelType = 'SBPM_PROCESS_MODEL';

export type ProcessNetworkDiagramType = ProcessGroupType | ProcessModelType | SbpmLayerType;

export type SbpmType = ProcessNetworkDiagramType;

export type SbpmElement<T extends SbpmType = SbpmType> = {
  id: string;
  type: T;
  label: string;
};

export type SbpmContainerElement<Type extends SbpmType = SbpmType, Child extends SbpmElement = SbpmElement> = SbpmElement<Type> & {
  children?: Child[];
};

export type SbpmProcessGroup = SbpmContainerElement<'SBPM_PROCESS_GROUP', SbpmProcessModel>;

export type SbpmProcessModel = SbpmContainerElement<'SBPM_PROCESS_MODEL', SbpmStandardLayer>;

export type SbpmStandardLayer = SbpmContainerElement<'SBPM_STANDARD_LAYER', any> & {
  implements?: SbpmElement<'SBPM_ABSTRACT_LAYER'>;
  initialElement?: SbpmElement<any>;
};

export type SbpmExtensionLayer = SbpmContainerElement<'SBPM_EXTENSION_LAYER', any> & {
  extends?: SbpmElement<'SBPM_STANDARD_LAYER'>;
};

export type SbpmAbstractLayer = SbpmContainerElement<'SBPM_ABSTRACT_LAYER', any>;

export type SbpmProcess = (SbpmProcessGroup | SbpmProcessModel | SbpmStandardLayer)[];

export type SbpmInitialData = SbpmProcess[];

export type SbpmOptions = {
  containerIdentifier: string;
  initialProcessGroups?: SbpmProcessGroup[];
  initialData?: SbpmInitialData;
};
