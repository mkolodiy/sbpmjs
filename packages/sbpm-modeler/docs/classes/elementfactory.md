[@sbpmjs/modeler](../README.md) › [ElementFactory](elementfactory.md)

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

*Defined in [factories/element-factory.ts:87](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L87)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | [Canvas](canvas.md) | [Canvas](canvas.md) object used to register events.  |

**Returns:** *[ElementFactory](elementfactory.md)*

## Accessors

###  selectedElement

• **selectedElement**:

*Defined in [factories/element-factory.ts:22](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L22)*

## Methods

###  add

▸ **add**<**A**>(`creationOptions`: [ElementCreationOptions](../interfaces/elementcreationoptions.md)‹A›): *Image*

*Defined in [factories/element-factory.ts:48](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L48)*

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

*Defined in [factories/element-factory.ts:37](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L37)*

**Returns:** *any*

___

###  getSelectedElementType

▸ **getSelectedElementType**(): *any*

*Defined in [factories/element-factory.ts:29](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L29)*

**Returns:** *any*

___

###  removeSelectedElement

▸ **removeSelectedElement**(): *void*

*Defined in [factories/element-factory.ts:84](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L84)*

**Returns:** *void*

___

###  update

▸ **update**(`options`: [GenericOptions](../interfaces/genericoptions.md), `element?`: Element): *void*

*Defined in [factories/element-factory.ts:63](https://github.com/mkolodiy/sbpmjs/blob/56eff71/packages/sbpm-modeler/lib/factories/element-factory.ts#L63)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [GenericOptions](../interfaces/genericoptions.md) | Update options. |
`element?` | Element | Element to update. |

**Returns:** *void*
