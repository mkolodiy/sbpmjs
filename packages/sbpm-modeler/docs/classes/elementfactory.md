[@sbpmjs/modeler - v1.0.0](../README.md) › [ElementFactory](elementfactory.md)

# Class: ElementFactory

## Hierarchy

* **ElementFactory**

## Index

### Constructors

* [constructor](elementfactory.md#constructor)

### Accessors

* [selectedElement](elementfactory.md#selectedelement)

### Methods

* [add](elementfactory.md#add)
* [getSelectedElementAttributes](elementfactory.md#getselectedelementattributes)
* [getSelectedElementType](elementfactory.md#getselectedelementtype)
* [removeSelectedElement](elementfactory.md#removeselectedelement)
* [update](elementfactory.md#update)

## Constructors

###  constructor

\+ **new ElementFactory**(`canvas`: [Canvas](canvas.md)): *[ElementFactory](elementfactory.md)*

*Defined in [factories/element-factory.ts:87](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L87)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | [Canvas](canvas.md) | [Canvas](canvas.md) object used to register events.  |

**Returns:** *[ElementFactory](elementfactory.md)*

## Accessors

###  selectedElement

• **get selectedElement**(): *Element‹›*

*Defined in [factories/element-factory.ts:22](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L22)*

Get currently selected element.

**Returns:** *Element‹›*

Joint element.

## Methods

###  add

▸ **add**‹**A**›(`creationOptions`: [ElementCreationOptions](../interfaces/elementcreationoptions.md)‹A›): *Image*

*Defined in [factories/element-factory.ts:48](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L48)*

Creates and adds a new element to the canvas.

**Type parameters:**

▪ **A**: *[ElementOptions](../interfaces/elementoptions.md)*

**Parameters:**

Name | Type |
------ | ------ |
`creationOptions` | [ElementCreationOptions](../interfaces/elementcreationoptions.md)‹A› |

**Returns:** *Image*

A new element.

___

###  getSelectedElementAttributes

▸ **getSelectedElementAttributes**(): *any*

*Defined in [factories/element-factory.ts:37](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L37)*

Get selected element attributes.

**Returns:** *any*

___

###  getSelectedElementType

▸ **getSelectedElementType**(): *any*

*Defined in [factories/element-factory.ts:29](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L29)*

Get selected element type.

**Returns:** *any*

___

###  removeSelectedElement

▸ **removeSelectedElement**(): *void*

*Defined in [factories/element-factory.ts:84](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L84)*

Removes currently selected element from canvas.

**Returns:** *void*

___

###  update

▸ **update**(`options`: [GenericOptions](../interfaces/genericoptions.md), `element?`: Element): *void*

*Defined in [factories/element-factory.ts:63](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/element-factory.ts#L63)*

Updates a given element or as fallback a currently selected element.

**`throws`** Error when no element was passed as a parameter and if no element is selected on canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [GenericOptions](../interfaces/genericoptions.md) | Update options. |
`element?` | Element | Element to update. |

**Returns:** *void*
