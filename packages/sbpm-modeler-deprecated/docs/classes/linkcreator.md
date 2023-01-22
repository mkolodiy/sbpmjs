[@sbpmjs/modeler - v1.0.0](../README.md) › [LinkCreator](linkcreator.md)

# Class: LinkCreator

## Hierarchy

* **LinkCreator**

## Index

### Constructors

* [constructor](linkcreator.md#constructor)

### Methods

* [addFunctionStateTransition](linkcreator.md#addfunctionstatetransition)
* [addMessageTransition](linkcreator.md#addmessagetransition)
* [addReceiveStateTransition](linkcreator.md#addreceivestatetransition)
* [addSendStateTransition](linkcreator.md#addsendstatetransition)
* [updateCurrentlySelectedLink](linkcreator.md#updatecurrentlyselectedlink)

## Constructors

###  constructor

\+ **new LinkCreator**(`canvas`: [Canvas](canvas.md), `container`: Element): *[LinkCreator](linkcreator.md)*

*Defined in [creators/link-creator.ts:20](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L20)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | [Canvas](canvas.md) | [Canvas](canvas.md) object |
`container` | Element | [[Element]] object  |

**Returns:** *[LinkCreator](linkcreator.md)*

## Methods

###  addFunctionStateTransition

▸ **addFunctionStateTransition**(`options`: [FunctionStateTransitionOptions](../interfaces/functionstatetransitionoptions.md)): *Link‹›*

*Defined in [creators/link-creator.ts:69](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L69)*

Adds a new function state transition to the canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [FunctionStateTransitionOptions](../interfaces/functionstatetransitionoptions.md) | [LinkOptions](../interfaces/linkoptions.md) object  |

**Returns:** *Link‹›*

___

###  addMessageTransition

▸ **addMessageTransition**(`options`: [MessageTransitionOptions](../interfaces/messagetransitionoptions.md)): *Link‹›*

*Defined in [creators/link-creator.ts:37](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L37)*

Adds a new message transition to the canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [MessageTransitionOptions](../interfaces/messagetransitionoptions.md) | [MessageTransitionOptions](../interfaces/messagetransitionoptions.md) object  |

**Returns:** *Link‹›*

___

###  addReceiveStateTransition

▸ **addReceiveStateTransition**(`options`: [ReceiveStateTransitionOptions](../interfaces/receivestatetransitionoptions.md)): *Link‹›*

*Defined in [creators/link-creator.ts:59](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L59)*

Adds a new receive state transition to the canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ReceiveStateTransitionOptions](../interfaces/receivestatetransitionoptions.md) | [LinkOptions](../interfaces/linkoptions.md) object  |

**Returns:** *Link‹›*

___

###  addSendStateTransition

▸ **addSendStateTransition**(`options`: [SendStateTransitionOptions](../interfaces/sendstatetransitionoptions.md)): *Link‹›*

*Defined in [creators/link-creator.ts:49](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L49)*

Adds a new send state transition to the canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SendStateTransitionOptions](../interfaces/sendstatetransitionoptions.md) | [LinkOptions](../interfaces/linkoptions.md) object  |

**Returns:** *Link‹›*

___

###  updateCurrentlySelectedLink

▸ **updateCurrentlySelectedLink**(`options`: [GenericOptions](../interfaces/genericoptions.md)): *void*

*Defined in [creators/link-creator.ts:79](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/creators/link-creator.ts#L79)*

Updates currently selected link on canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [GenericOptions](../interfaces/genericoptions.md) | Update options.  |

**Returns:** *void*
