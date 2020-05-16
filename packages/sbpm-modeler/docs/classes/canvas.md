[@sbpmjs/modeler](../README.md) › [Canvas](canvas.md)

# Class: Canvas

## Hierarchy

* **Canvas**

## Index

### Constructors

* [constructor](canvas.md#constructor)

### Accessors

* [graph](canvas.md#graph)
* [paper](canvas.md#paper)

### Methods

* [clear](canvas.md#clear)
* [findModelFromPoint](canvas.md#findmodelfrompoint)
* [findViewFromPoint](canvas.md#findviewfrompoint)
* [getCellView](canvas.md#getcellview)
* [getElements](canvas.md#getelements)
* [getLinks](canvas.md#getlinks)
* [hideAllTools](canvas.md#hidealltools)
* [onElementSelected](canvas.md#onelementselected)
* [onLinkSelected](canvas.md#onlinkselected)
* [setToOrigin](canvas.md#settoorigin)
* [triggerElementPointerdown](canvas.md#triggerelementpointerdown)
* [triggerLinkPointerdown](canvas.md#triggerlinkpointerdown)
* [unhighlightAllElements](canvas.md#unhighlightallelements)
* [unhighlightElement](canvas.md#unhighlightelement)

## Constructors

###  constructor

\+ **new Canvas**(`options`: [ModelerOptions](../interfaces/modeleroptions.md)): *[Canvas](canvas.md)*

*Defined in [canvas.ts:29](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L29)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ModelerOptions](../interfaces/modeleroptions.md) | [ModelerOptions](../interfaces/modeleroptions.md) object containing all options for creating a new canvas.  |

**Returns:** *[Canvas](canvas.md)*

## Accessors

###  graph

• **graph**:

*Defined in [canvas.ts:62](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L62)*

___

###  paper

• **paper**:

*Defined in [canvas.ts:71](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L71)*

## Methods

###  clear

▸ **clear**(): *void*

*Defined in [canvas.ts:118](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L118)*

**Returns:** *void*

___

###  findModelFromPoint

▸ **findModelFromPoint**(`coordinates`: [Coordinates](../interfaces/coordinates.md)): *Element‹›*

*Defined in [canvas.ts:194](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L194)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coordinates` | [Coordinates](../interfaces/coordinates.md) | [Coordinates](../interfaces/coordinates.md) object.  |

**Returns:** *Element‹›*

___

###  findViewFromPoint

▸ **findViewFromPoint**(`coordinates`: [Coordinates](../interfaces/coordinates.md)): *ElementView‹›*

*Defined in [canvas.ts:208](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L208)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coordinates` | [Coordinates](../interfaces/coordinates.md) | [Coordinates](../interfaces/coordinates.md) object.  |

**Returns:** *ElementView‹›*

___

###  getCellView

▸ **getCellView**(`model`: Element): *ElementView‹› | LinkView‹›*

*Defined in [canvas.ts:167](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L167)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | Element | Joint element. |

**Returns:** *ElementView‹› | LinkView‹›*

Joint cell view.

___

###  getElements

▸ **getElements**(): *Element‹›[]*

*Defined in [canvas.ts:96](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L96)*

**Returns:** *Element‹›[]*

___

###  getLinks

▸ **getLinks**(): *Link‹›[]*

*Defined in [canvas.ts:107](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L107)*

**Returns:** *Link‹›[]*

___

###  hideAllTools

▸ **hideAllTools**(): *void*

*Defined in [canvas.ts:157](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L157)*

**Returns:** *void*

___

###  onElementSelected

▸ **onElementSelected**(`cb`: function): *void*

*Defined in [canvas.ts:176](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L176)*

**Parameters:**

▪ **cb**: *function*

▸ (`cellView?`: CellView): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cellView?` | CellView |

**Returns:** *void*

___

###  onLinkSelected

▸ **onLinkSelected**(`cb`: function): *void*

*Defined in [canvas.ts:185](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L185)*

**Parameters:**

▪ **cb**: *function*

▸ (`cellView?`: CellView): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cellView?` | CellView |

**Returns:** *void*

___

###  setToOrigin

▸ **setToOrigin**(): *void*

*Defined in [canvas.ts:126](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L126)*

**Returns:** *void*

___

###  triggerElementPointerdown

▸ **triggerElementPointerdown**(`element`: Element): *void*

*Defined in [canvas.ts:135](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L135)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | Element | Joint element.  |

**Returns:** *void*

___

###  triggerLinkPointerdown

▸ **triggerLinkPointerdown**(`link`: Link): *void*

*Defined in [canvas.ts:147](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L147)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`link` | Link | Joint link.  |

**Returns:** *void*

___

###  unhighlightAllElements

▸ **unhighlightAllElements**(): *void*

*Defined in [canvas.ts:78](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L78)*

**Returns:** *void*

___

###  unhighlightElement

▸ **unhighlightElement**(`model`: Element): *void*

*Defined in [canvas.ts:89](https://github.com/mkolodiy/sbpmjs/blob/51ad125/packages/sbpm-modeler/lib/canvas.ts#L89)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | Element | Joint element.  |

**Returns:** *void*
