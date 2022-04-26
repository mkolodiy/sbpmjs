import SbpmElement from '../element';
import SbpmLink from '../link';

export type SbpmModelerOptions = {
  container: HTMLElement;
  onSelectElement?: (element: SbpmElement) => void;
  onSelectLink?: (element: SbpmLink) => void;
  onDeleteElement?: (element: SbpmElement) => void;
  onDeleteLink?: (element: SbpmLink) => void;
  onOpenElement?: (element: SbpmElement) => void;
  onOpenLink?: (element: SbpmLink) => void;
};
