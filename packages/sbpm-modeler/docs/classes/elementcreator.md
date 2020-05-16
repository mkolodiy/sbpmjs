[@sbpmjs/modeler](../README.md) › [ElementCreator](elementcreator.md)

# Class: ElementCreator

## Hierarchy

* **ElementCreator**

## Index

### Constructors

* [constructor](elementcreator.md#constructor)

### Methods

* [addFunctionState](elementcreator.md#addfunctionstate)
* [addReceiveState](elementcreator.md#addreceivestate)
* [addSendState](elementcreator.md#addsendstate)
* [addStandardSubject](elementcreator.md#addstandardsubject)
* [updateCurrentlySelectedElement](elementcreator.md#updatecurrentlyselectedelement)

## Constructors

###  constructor

\+ **new ElementCreator**(`canvas`: [Canvas](canvas.md)): *[ElementCreator](elementcreator.md)*

*Defined in [creators/element-creator.ts:13](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L13)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | [Canvas](canvas.md) | [Canvas](canvas.md) object  |

**Returns:** *[ElementCreator](elementcreator.md)*

## Methods

###  addFunctionState

▸ **addFunctionState**(`options`: [StateOptions](../interfaces/stateoptions.md)): *Image‹›*

*Defined in [creators/element-creator.ts:59](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L59)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](../interfaces/stateoptions.md) | [StateOptions](../interfaces/stateoptions.md) object  |

**Returns:** *Image‹›*

___

###  addReceiveState

▸ **addReceiveState**(`options`: [StateOptions](../interfaces/stateoptions.md)): *Image‹›*

*Defined in [creators/element-creator.ts:49](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L49)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](../interfaces/stateoptions.md) | [StateOptions](../interfaces/stateoptions.md) object  |

**Returns:** *Image‹›*

___

###  addSendState

▸ **addSendState**(`options`: [StateOptions](../interfaces/stateoptions.md)): *Image‹›*

*Defined in [creators/element-creator.ts:39](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L39)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [StateOptions](../interfaces/stateoptions.md) | [StateOptions](../interfaces/stateoptions.md) object  |

**Returns:** *Image‹›*

___

###  addStandardSubject

▸ **addStandardSubject**(`options`: [SubjectOptions](../interfaces/subjectoptions.md)): *Image‹›*

*Defined in [creators/element-creator.ts:29](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L29)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SubjectOptions](../interfaces/subjectoptions.md) | [SubjectOptions](../interfaces/subjectoptions.md) object  |

**Returns:** *Image‹›*

___

###  updateCurrentlySelectedElement

▸ **updateCurrentlySelectedElement**(`options`: [GenericOptions](../interfaces/genericoptions.md)): *void*

*Defined in [creators/element-creator.ts:69](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/creators/element-creator.ts#L69)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [GenericOptions](../interfaces/genericoptions.md) | Update options.  |

**Returns:** *void*
