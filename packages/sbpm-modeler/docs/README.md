[@sbpmjs/modeler](README.md)

# @sbpmjs/modeler

## Index

### Enumerations

* [CustomEvent](enums/customevent.md)
* [Event](enums/event.md)
* [ShapeNamespace](enums/shapenamespace.md)
* [ShapeType](enums/shapetype.md)

### Classes

* [Canvas](classes/canvas.md)
* [ElementCreator](classes/elementcreator.md)
* [ElementFactory](classes/elementfactory.md)
* [LinkCreator](classes/linkcreator.md)
* [LinkFactory](classes/linkfactory.md)
* [Modeler](classes/modeler.md)

### Interfaces

* [ButtonOptions](interfaces/buttonoptions.md)
* [Coordinates](interfaces/coordinates.md)
* [CreationOptions](interfaces/creationoptions.md)
* [ElementCreationOptions](interfaces/elementcreationoptions.md)
* [ElementOptions](interfaces/elementoptions.md)
* [ElementToolsOptions](interfaces/elementtoolsoptions.md)
* [FunctionStateTransitionOptions](interfaces/functionstatetransitionoptions.md)
* [GenericOptions](interfaces/genericoptions.md)
* [LabelBasedLinkToolsOptions](interfaces/labelbasedlinktoolsoptions.md)
* [LinkCreationOptions](interfaces/linkcreationoptions.md)
* [LinkOptions](interfaces/linkoptions.md)
* [MessageTransitionOptions](interfaces/messagetransitionoptions.md)
* [ModelerOptions](interfaces/modeleroptions.md)
* [ReceiveStateTransitionOptions](interfaces/receivestatetransitionoptions.md)
* [SendStateTransitionOptions](interfaces/sendstatetransitionoptions.md)
* [StateOptions](interfaces/stateoptions.md)
* [SubjectOptions](interfaces/subjectoptions.md)

### Type aliases

* [FunctionStateTransitionUpdateOptions](README.md#functionstatetransitionupdateoptions)
* [MessageTransitionUpdateOptions](README.md#messagetransitionupdateoptions)
* [ReceiveStateTransitionUpdateOptions](README.md#receivestatetransitionupdateoptions)
* [SendStateTransitionUpdateOptions](README.md#sendstatetransitionupdateoptions)
* [StateUpdateOptions](README.md#stateupdateoptions)
* [SubjectUpdateOptions](README.md#subjectupdateoptions)

### Variables

* [CUSTOM_EVENTS](README.md#const-custom_events)
* [SVG_PREFIX](README.md#const-svg_prefix)
* [autoRenewIcon](README.md#const-autorenewicon)
* [blueDotIcon](README.md#const-bluedoticon)
* [callMadeIcon](README.md#const-callmadeicon)
* [deleteIcon](README.md#const-deleteicon)
* [functionStateIcon](README.md#const-functionstateicon)
* [openInNewIcon](README.md#const-openinnewicon)
* [receiveStateIcon](README.md#const-receivestateicon)
* [redDotIcon](README.md#const-reddoticon)
* [sendStateIcon](README.md#const-sendstateicon)

### Functions

* [combineStrings](README.md#const-combinestrings)
* [createElementTools](README.md#const-createelementtools)
* [createFunctionStateOptions](README.md#const-createfunctionstateoptions)
* [createFunctionStateTransitionOptions](README.md#const-createfunctionstatetransitionoptions)
* [createFunctionStateTransitionUpdateOptions](README.md#const-createfunctionstatetransitionupdateoptions)
* [createFunctionStateUpdateOptions](README.md#const-createfunctionstateupdateoptions)
* [createIcon](README.md#const-createicon)
* [createLabelBasedLinkTools](README.md#const-createlabelbasedlinktools)
* [createLinkTools](README.md#const-createlinktools)
* [createMessageTransitionOptions](README.md#const-createmessagetransitionoptions)
* [createMessageTransitionUpdateOptions](README.md#const-createmessagetransitionupdateoptions)
* [createReceiveStateOptions](README.md#const-createreceivestateoptions)
* [createReceiveStateTransitionOptions](README.md#const-createreceivestatetransitionoptions)
* [createReceiveStateTransitionUpdateOptions](README.md#const-createreceivestatetransitionupdateoptions)
* [createReceiveStateUpdateOptions](README.md#const-createreceivestateupdateoptions)
* [createSendStateOptions](README.md#const-createsendstateoptions)
* [createSendStateTransitionOptions](README.md#const-createsendstatetransitionoptions)
* [createSendStateTransitionUpdateOptions](README.md#const-createsendstatetransitionupdateoptions)
* [createSendStateUpdateOptions](README.md#const-createsendstateupdateoptions)
* [createStandardSubjectOptions](README.md#const-createstandardsubjectoptions)
* [createStandardSubjectUpdateOptions](README.md#const-createstandardsubjectupdateoptions)
* [createStateUpdateOptions](README.md#const-createstateupdateoptions)
* [flattenObject](README.md#const-flattenobject)
* [getDescriptionProperty](README.md#const-getdescriptionproperty)
* [getJointOptions](README.md#const-getjointoptions)
* [getStateModifierOptions](README.md#const-getstatemodifieroptions)
* [humanSubjectIcon](README.md#const-humansubjecticon)
* [isCommonType](README.md#const-iscommontype)
* [machineSubjectIcon](README.md#const-machinesubjecticon)
* [noop](README.md#const-noop)

### Object literals

* [humanSubjectJointOptions](README.md#const-humansubjectjointoptions)
* [humanSubjectToolsOptions](README.md#const-humansubjecttoolsoptions)
* [machineSubjectJointOptions](README.md#const-machinesubjectjointoptions)
* [machineSubjectToolsOptions](README.md#const-machinesubjecttoolsoptions)
* [toolsOptions](README.md#const-toolsoptions)

## Type aliases

###  FunctionStateTransitionUpdateOptions

Ƭ **FunctionStateTransitionUpdateOptions**: *Partial‹Omit‹[FunctionStateTransitionOptions](interfaces/functionstatetransitionoptions.md), "source" | "target"››*

*Defined in [common/types.ts:280](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L280)*

___

###  MessageTransitionUpdateOptions

Ƭ **MessageTransitionUpdateOptions**: *Partial‹Omit‹[MessageTransitionOptions](interfaces/messagetransitionoptions.md), "source" | "target"››*

*Defined in [common/types.ts:221](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L221)*

___

###  ReceiveStateTransitionUpdateOptions

Ƭ **ReceiveStateTransitionUpdateOptions**: *Partial‹Omit‹[ReceiveStateTransitionOptions](interfaces/receivestatetransitionoptions.md), "source" | "target"››*

*Defined in [common/types.ts:263](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L263)*

___

###  SendStateTransitionUpdateOptions

Ƭ **SendStateTransitionUpdateOptions**: *Partial‹Omit‹[SendStateTransitionOptions](interfaces/sendstatetransitionoptions.md), "source" | "target"››*

*Defined in [common/types.ts:242](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L242)*

___

###  StateUpdateOptions

Ƭ **StateUpdateOptions**: *Partial‹Omit‹[StateOptions](interfaces/stateoptions.md), "position"››*

*Defined in [common/types.ts:158](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L158)*

___

###  SubjectUpdateOptions

Ƭ **SubjectUpdateOptions**: *Partial‹Omit‹[SubjectOptions](interfaces/subjectoptions.md), "position"››*

*Defined in [common/types.ts:135](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/types.ts#L135)*

## Variables

### `Const` CUSTOM_EVENTS

• **CUSTOM_EVENTS**: *[CustomEvent](enums/customevent.md)[]* =  [
  CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION,
  CustomEvent.ELEMENT_ADD_SEND_STATE_TRANSITION,
  CustomEvent.ELEMENT_ADD_RECEIVE_STATE_TRANSITION,
  CustomEvent.ELEMENT_ADD_FUNCTION_STATE_TRANSITION
]

*Defined in [common/constants.ts:55](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/constants.ts#L55)*

___

### `Const` SVG_PREFIX

• **SVG_PREFIX**: *"data:image/svg+xml;utf8,"* = "data:image/svg+xml;utf8,"

*Defined in [common/constants.ts:62](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/constants.ts#L62)*

___

### `Const` autoRenewIcon

• **autoRenewIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
)

*Defined in [common/icons.ts:3](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L3)*

___

### `Const` blueDotIcon

• **blueDotIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="402" height="402"><circle fill="#33B" cx="201" cy="201" r="201" opacity="0.5"/><text x="121" y="299" font-size="300" fill="#fff" font-family="monospace">S</text></svg>'
)

*Defined in [common/icons.ts:19](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L19)*

___

### `Const` callMadeIcon

• **callMadeIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/></svg>'
)

*Defined in [common/icons.ts:7](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L7)*

___

### `Const` deleteIcon

• **deleteIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
)

*Defined in [common/icons.ts:11](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L11)*

___

### `Const` functionStateIcon

• **functionStateIcon**: *string* =  createIcon(iconTemplate)

*Defined in [shapes/elements/function-state/icons.ts:1852](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/icons.ts#L1852)*

___

### `Const` openInNewIcon

• **openInNewIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>'
)

*Defined in [common/icons.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L15)*

___

### `Const` receiveStateIcon

• **receiveStateIcon**: *string* =  createIcon(iconTemplate)

*Defined in [shapes/elements/receive-state/icons.ts:1852](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/icons.ts#L1852)*

___

### `Const` redDotIcon

• **redDotIcon**: *string* =  createIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" width="402" height="402"><circle fill="#ff0000" cx="201" cy="201" r="201" opacity="0.5"/><text x="121" y="299" font-size="300" fill="#fff" font-family="monospace">E</text></svg>'
)

*Defined in [common/icons.ts:23](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/icons.ts#L23)*

___

### `Const` sendStateIcon

• **sendStateIcon**: *string* =  createIcon(iconTemplate)

*Defined in [shapes/elements/send-state/icons.ts:1852](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/icons.ts#L1852)*

## Functions

### `Const` combineStrings

▸ **combineStrings**(`strings`: string[], `separator`: string): *string*

*Defined in [common/utils.ts:10](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/utils.ts#L10)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`strings` | string[] | - | List with strings that should be combined. |
`separator` | string | " " | Separator which should be use to combine the strings.  |

**Returns:** *string*

___

### `Const` createElementTools

▸ **createElementTools**(`options`: [ElementToolsOptions](interfaces/elementtoolsoptions.md), `paper`: Paper): *ToolsView‹›*

*Defined in [shape-tools/element-tools.ts:12](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shape-tools/element-tools.ts#L12)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ElementToolsOptions](interfaces/elementtoolsoptions.md) | [ElementToolsOptions](interfaces/elementtoolsoptions.md) object. |
`paper` | Paper | - |

**Returns:** *ToolsView‹›*

A new tools view.

___

### `Const` createFunctionStateOptions

▸ **createFunctionStateOptions**(`options`: [StateOptions](interfaces/stateoptions.md)): *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

*Defined in [shapes/elements/function-state/index.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/index.ts#L15)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) | [StateOptions](interfaces/stateoptions.md) object.  |

**Returns:** *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

___

### `Const` createFunctionStateTransitionOptions

▸ **createFunctionStateTransitionOptions**(`options`: [LinkOptions](interfaces/linkoptions.md)): *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

*Defined in [shapes/links/function-state-transition.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/links/function-state-transition.ts#L13)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [LinkOptions](interfaces/linkoptions.md) | [LinkOptions](interfaces/linkoptions.md) object.  |

**Returns:** *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

___

### `Const` createFunctionStateTransitionUpdateOptions

▸ **createFunctionStateTransitionUpdateOptions**(`options`: [FunctionStateTransitionUpdateOptions](README.md#functionstatetransitionupdateoptions)): *object*

*Defined in [shapes/common/link.ts:82](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/link.ts#L82)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [FunctionStateTransitionUpdateOptions](README.md#functionstatetransitionupdateoptions) | Update options.  |

**Returns:** *object*

___

### `Const` createFunctionStateUpdateOptions

▸ **createFunctionStateUpdateOptions**(`options`: [StateUpdateOptions](README.md#stateupdateoptions)): *object | object*

*Defined in [shapes/elements/function-state/index.ts:26](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object | object*

___

### `Const` createIcon

▸ **createIcon**(`template`: string): *string*

*Defined in [common/utils.ts:19](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/utils.ts#L19)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`template` | string | SVG icon template.  |

**Returns:** *string*

___

### `Const` createLabelBasedLinkTools

▸ **createLabelBasedLinkTools**(`options`: [LabelBasedLinkToolsOptions](interfaces/labelbasedlinktoolsoptions.md)): *object | object | object[]*

*Defined in [shape-tools/link-tools.ts:36](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shape-tools/link-tools.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [LabelBasedLinkToolsOptions](interfaces/labelbasedlinktoolsoptions.md) |

**Returns:** *object | object | object[]*

Array with link tools as labels.

___

### `Const` createLinkTools

▸ **createLinkTools**(`useSourceArrowhead`: boolean): *ToolsView‹›*

*Defined in [shape-tools/link-tools.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shape-tools/link-tools.ts#L13)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`useSourceArrowhead` | boolean | false | Indicates if SourceArrowhead tool should be used added to link tools. |

**Returns:** *ToolsView‹›*

A new tools view.

___

### `Const` createMessageTransitionOptions

▸ **createMessageTransitionOptions**(`options`: [MessageTransitionOptions](interfaces/messagetransitionoptions.md)): *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[MessageTransitionOptions](interfaces/messagetransitionoptions.md)›*

*Defined in [shapes/links/message-transition.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/links/message-transition.ts#L15)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [MessageTransitionOptions](interfaces/messagetransitionoptions.md) | [MessageTransitionOptions](interfaces/messagetransitionoptions.md) object.  |

**Returns:** *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[MessageTransitionOptions](interfaces/messagetransitionoptions.md)›*

___

### `Const` createMessageTransitionUpdateOptions

▸ **createMessageTransitionUpdateOptions**(`options`: [MessageTransitionUpdateOptions](README.md#messagetransitionupdateoptions)): *object*

*Defined in [shapes/links/message-transition.ts:28](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/links/message-transition.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [MessageTransitionUpdateOptions](README.md#messagetransitionupdateoptions) |

**Returns:** *object*

___

### `Const` createReceiveStateOptions

▸ **createReceiveStateOptions**(`options`: [StateOptions](interfaces/stateoptions.md)): *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

*Defined in [shapes/elements/receive-state/index.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/index.ts#L15)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) | [StateOptions](interfaces/stateoptions.md) object.  |

**Returns:** *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

___

### `Const` createReceiveStateTransitionOptions

▸ **createReceiveStateTransitionOptions**(`options`: [LinkOptions](interfaces/linkoptions.md)): *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

*Defined in [shapes/links/receive-state-transition.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/links/receive-state-transition.ts#L13)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [LinkOptions](interfaces/linkoptions.md) | [LinkOptions](interfaces/linkoptions.md) object.  |

**Returns:** *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

___

### `Const` createReceiveStateTransitionUpdateOptions

▸ **createReceiveStateTransitionUpdateOptions**(`options`: [ReceiveStateTransitionUpdateOptions](README.md#receivestatetransitionupdateoptions)): *object*

*Defined in [shapes/common/link.ts:47](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/link.ts#L47)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ReceiveStateTransitionUpdateOptions](README.md#receivestatetransitionupdateoptions) | Update options.  |

**Returns:** *object*

___

### `Const` createReceiveStateUpdateOptions

▸ **createReceiveStateUpdateOptions**(`options`: [StateUpdateOptions](README.md#stateupdateoptions)): *object | object*

*Defined in [shapes/elements/receive-state/index.ts:26](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object | object*

___

### `Const` createSendStateOptions

▸ **createSendStateOptions**(`options`: [StateOptions](interfaces/stateoptions.md)): *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

*Defined in [shapes/elements/send-state/index.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/index.ts#L15)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) | [StateOptions](interfaces/stateoptions.md) object.  |

**Returns:** *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[StateOptions](interfaces/stateoptions.md)›*

___

### `Const` createSendStateTransitionOptions

▸ **createSendStateTransitionOptions**(`options`: [LinkOptions](interfaces/linkoptions.md)): *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

*Defined in [shapes/links/send-state-transition.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/links/send-state-transition.ts#L13)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [LinkOptions](interfaces/linkoptions.md) | [LinkOptions](interfaces/linkoptions.md) object.  |

**Returns:** *[LinkCreationOptions](interfaces/linkcreationoptions.md)‹[LinkOptions](interfaces/linkoptions.md)›*

___

### `Const` createSendStateTransitionUpdateOptions

▸ **createSendStateTransitionUpdateOptions**(`options`: [SendStateTransitionUpdateOptions](README.md#sendstatetransitionupdateoptions)): *object*

*Defined in [shapes/common/link.ts:12](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/link.ts#L12)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SendStateTransitionUpdateOptions](README.md#sendstatetransitionupdateoptions) | Update options.  |

**Returns:** *object*

___

### `Const` createSendStateUpdateOptions

▸ **createSendStateUpdateOptions**(`options`: [StateUpdateOptions](README.md#stateupdateoptions)): *object | object*

*Defined in [shapes/elements/send-state/index.ts:26](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object | object*

___

### `Const` createStandardSubjectOptions

▸ **createStandardSubjectOptions**(`options`: [SubjectOptions](interfaces/subjectoptions.md)): *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[SubjectOptions](interfaces/subjectoptions.md)›*

*Defined in [shapes/elements/standard-subject/index.ts:21](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/index.ts#L21)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SubjectOptions](interfaces/subjectoptions.md) | [SubjectOptions](interfaces/subjectoptions.md) object.  |

**Returns:** *[ElementCreationOptions](interfaces/elementcreationoptions.md)‹[SubjectOptions](interfaces/subjectoptions.md)›*

___

### `Const` createStandardSubjectUpdateOptions

▸ **createStandardSubjectUpdateOptions**(`options`: [SubjectUpdateOptions](README.md#subjectupdateoptions)): *object | object | object | object*

*Defined in [shapes/elements/standard-subject/index.ts:33](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/index.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [SubjectUpdateOptions](README.md#subjectupdateoptions) |

**Returns:** *object | object | object | object*

___

### `Const` createStateUpdateOptions

▸ **createStateUpdateOptions**(`options`: [StateUpdateOptions](README.md#stateupdateoptions), `jointOptions`: [GenericOptions](interfaces/genericoptions.md)): *object | object*

*Defined in [shapes/common/elements.ts:11](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/elements.ts#L11)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateUpdateOptions](README.md#stateupdateoptions) | Update options.  |
`jointOptions` | [GenericOptions](interfaces/genericoptions.md) | - |

**Returns:** *object | object*

___

### `Const` flattenObject

▸ **flattenObject**(`object`: [GenericOptions](interfaces/genericoptions.md), `prefix`: string, `result`: [GenericOptions](interfaces/genericoptions.md)): *[GenericOptions](interfaces/genericoptions.md)*

*Defined in [common/utils.ts:37](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/utils.ts#L37)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`object` | [GenericOptions](interfaces/genericoptions.md) | - |
`prefix` | string | "" |
`result` | [GenericOptions](interfaces/genericoptions.md) |  {} |

**Returns:** *[GenericOptions](interfaces/genericoptions.md)*

___

### `Const` getDescriptionProperty

▸ **getDescriptionProperty**(`description`: string): *object | object*

*Defined in [shapes/common/helper.ts:1](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/helper.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`description` | string |

**Returns:** *object | object*

___

### `Const` getJointOptions

▸ **getJointOptions**(`options`: [StateOptions](interfaces/stateoptions.md) | [StateUpdateOptions](README.md#stateupdateoptions)): *object*

*Defined in [shapes/elements/send-state/options.ts:32](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/options.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) &#124; [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object*

▸ **getJointOptions**(`options`: [StateOptions](interfaces/stateoptions.md) | [StateUpdateOptions](README.md#stateupdateoptions)): *object*

*Defined in [shapes/elements/receive-state/options.ts:32](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/options.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) &#124; [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object*

▸ **getJointOptions**(`options`: [StateOptions](interfaces/stateoptions.md) | [StateUpdateOptions](README.md#stateupdateoptions)): *object*

*Defined in [shapes/elements/function-state/options.ts:32](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/options.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [StateOptions](interfaces/stateoptions.md) &#124; [StateUpdateOptions](README.md#stateupdateoptions) |

**Returns:** *object*

___

### `Const` getStateModifierOptions

▸ **getStateModifierOptions**(`options`: [GenericOptions](interfaces/genericoptions.md)): *object*

*Defined in [shapes/common/elements.ts:38](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/common/elements.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [GenericOptions](interfaces/genericoptions.md) |

**Returns:** *object*

___

### `Const` humanSubjectIcon

▸ **humanSubjectIcon**(): *string*

*Defined in [shapes/elements/standard-subject/icons.ts:6](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/icons.ts#L6)*

**Returns:** *string*

___

### `Const` isCommonType

▸ **isCommonType**(`type`: string): *boolean*

*Defined in [common/utils.ts:28](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/utils.ts#L28)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | string | Type of a shape.  |

**Returns:** *boolean*

___

### `Const` machineSubjectIcon

▸ **machineSubjectIcon**(): *string*

*Defined in [shapes/elements/standard-subject/icons.ts:1862](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/icons.ts#L1862)*

**Returns:** *string*

___

### `Const` noop

▸ **noop**(): *void*

*Defined in [common/utils.ts:35](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/common/utils.ts#L35)*

**Returns:** *void*

## Object literals

### `Const` humanSubjectJointOptions

### ▪ **humanSubjectJointOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:33](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L33)*

▪ **attrs**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:38](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L38)*

* **image**: *object*

  * **cursor**: *string* = "pointer"

  * **height**: *number* = 140

  * **width**: *number* = 90

  * **xlinkHref**: *string* =  humanSubjectIcon()

* **text**: *object*

  * **fontWeight**: *string* = "bold"

  * **lineHeight**: *number* = 18

  * **pointerEvents**: *string* = "none"

  * **xAlignment**: *number* = 65

  * **yAlignment**: *number* =  -80

  * **textWrap**: *object*

    * **width**: *number* = 150

▪ **size**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:34](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L34)*

* **height**: *number* = 140

* **width**: *number* = 90

___

### `Const` humanSubjectToolsOptions

### ▪ **humanSubjectToolsOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:8](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L8)*

▪ **linkButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:21](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L21)*

* **event**: *[CustomEvent](enums/customevent.md)* =  CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION

* **coordinates**: *object*

  * **x**: *number* = 155

  * **y**: *number* =  -13

▪ **openInNewButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:15](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L15)*

* **coordinates**: *object*

  * **x**: *number* = 130

  * **y**: *number* =  -13

▪ **removeButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:9](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L9)*

* **coordinates**: *object*

  * **x**: *number* = 105

  * **y**: *number* =  -13

___

### `Const` machineSubjectJointOptions

### ▪ **machineSubjectJointOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:86](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L86)*

▪ **attrs**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:91](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L91)*

* **image**: *object*

  * **cursor**: *string* = "pointer"

  * **height**: *number* = 140

  * **width**: *number* = 110

  * **xlinkHref**: *string* =  machineSubjectIcon()

* **text**: *object*

  * **fontWeight**: *string* = "bold"

  * **lineHeight**: *number* = 18

  * **pointerEvents**: *string* = "none"

  * **xAlignment**: *number* = 75

  * **yAlignment**: *number* =  -80

  * **textWrap**: *object*

    * **width**: *number* = 150

▪ **size**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:87](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L87)*

* **height**: *number* = 140

* **width**: *number* = 110

___

### `Const` machineSubjectToolsOptions

### ▪ **machineSubjectToolsOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:61](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L61)*

▪ **linkButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:74](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L74)*

* **event**: *[CustomEvent](enums/customevent.md)* =  CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION

* **coordinates**: *object*

  * **x**: *number* = 175

  * **y**: *number* =  -13

▪ **openInNewButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:68](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L68)*

* **coordinates**: *object*

  * **x**: *number* = 150

  * **y**: *number* =  -13

▪ **removeButtonOptions**: *object*

*Defined in [shapes/elements/standard-subject/options.ts:62](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/standard-subject/options.ts#L62)*

* **coordinates**: *object*

  * **x**: *number* = 125

  * **y**: *number* =  -13

___

### `Const` toolsOptions

### ▪ **toolsOptions**: *object*

*Defined in [shapes/elements/send-state/options.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/options.ts#L13)*

*Defined in [shapes/elements/receive-state/options.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/options.ts#L13)*

*Defined in [shapes/elements/function-state/options.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/options.ts#L13)*

▪ **linkButtonOptions**: *object*

*Defined in [shapes/elements/send-state/options.ts:20](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/options.ts#L20)*

*Defined in [shapes/elements/receive-state/options.ts:20](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/options.ts#L20)*

*Defined in [shapes/elements/function-state/options.ts:20](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/options.ts#L20)*

* **event**: *[CustomEvent](enums/customevent.md)* =  CustomEvent.ELEMENT_ADD_FUNCTION_STATE_TRANSITION

* **coordinates**: *object*

  * **x**: *number* = 130

  * **y**: *number* =  -13

▪ **removeButtonOptions**: *object*

*Defined in [shapes/elements/send-state/options.ts:14](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/send-state/options.ts#L14)*

*Defined in [shapes/elements/receive-state/options.ts:14](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/receive-state/options.ts#L14)*

*Defined in [shapes/elements/function-state/options.ts:14](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/shapes/elements/function-state/options.ts#L14)*

* **coordinates**: *object*

  * **x**: *number* = 105

  * **y**: *number* =  -13
