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

export type SbpmContainerElement<Type extends SbpmType = SbpmType> = SbpmElement<Type> & {
  contains?: string[];
};

export type SbpmProcessGroup = SbpmContainerElement<ProcessGroupType>;

export type SbpmProcessModel = SbpmContainerElement<ProcessModelType>;

export type SbpmStandardLayer = SbpmContainerElement<'SBPM_STANDARD_LAYER'> & {
  implements?: SbpmElement<'SBPM_ABSTRACT_LAYER'>;
  initialElement?: SbpmElement<any>;
};

export type SbpmExtensionLayer = SbpmContainerElement<'SBPM_EXTENSION_LAYER'> & {
  extends?: SbpmElement<'SBPM_STANDARD_LAYER'>;
};

export type SbpmAbstractLayer = SbpmContainerElement<'SBPM_ABSTRACT_LAYER'>;

export type SbpmProcess = (SbpmProcessGroup | SbpmProcessModel | SbpmStandardLayer)[];

export type SbpmProcessList = SbpmProcess[];

export type SbpmOptions = {
  containerIdentifier: string;
  initialProcessGroups?: SbpmProcessGroup[];
  initialProcessList?: SbpmProcessList;
};
