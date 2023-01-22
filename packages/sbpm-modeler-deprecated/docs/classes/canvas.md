[@sbpmjs/modeler - v1.0.0](../README.md) › [Canvas](canvas.md)

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

*Defined in [canvas.ts:29](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L29)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ModelerOptions](../interfaces/modeleroptions.md) | [ModelerOptions](../interfaces/modeleroptions.md) object containing all options for creating a new canvas.  |

**Returns:** *[Canvas](canvas.md)*

## Accessors

###  graph

• **get graph**(): *Graph‹›*

*Defined in [canvas.ts:62](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L62)*

Returns graph instance.

**Returns:** *Graph‹›*

Joint graph.

___

###  paper

• **get paper**(): *Paper‹›*

*Defined in [canvas.ts:71](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L71)*

Returns paper instance.

**Returns:** *Paper‹›*

Joint paper.

## Methods

###  clear

▸ **clear**(): *void*

*Defined in [canvas.ts:118](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L118)*

Removes all shapes from the graph.

**Returns:** *void*

___

###  findModelFromPoint

▸ **findModelFromPoint**(`coordinates`: [Coordinates](../interfaces/coordinates.md)): *Element‹›*

*Defined in [canvas.ts:194](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L194)*

Get model from a point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coordinates` | [Coordinates](../interfaces/coordinates.md) | [Coordinates](../interfaces/coordinates.md) object.  |

**Returns:** *Element‹›*

___

###  findViewFromPoint

▸ **findViewFromPoint**(`coordinates`: [Coordinates](../interfaces/coordinates.md)): *ElementView‹›*

*Defined in [canvas.ts:208](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L208)*

Get view from a point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coordinates` | [Coordinates](../interfaces/coordinates.md) | [Coordinates](../interfaces/coordinates.md) object.  |

**Returns:** *ElementView‹›*

___

###  getCellView

▸ **getCellView**(`model`: Element): *ElementView‹› | LinkView‹›*

*Defined in [canvas.ts:167](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L167)*

Get element cell view;

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | Element | Joint element. |

**Returns:** *ElementView‹› | LinkView‹›*

Joint cell view.

___

###  getElements

▸ **getElements**(): *Element‹›[]*

*Defined in [canvas.ts:96](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L96)*

Get all elements on the canvas.

**Returns:** *Element‹›[]*

___

###  getLinks

▸ **getLinks**(): *Link‹›[]*

*Defined in [canvas.ts:107](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L107)*

Get all links on the canvas.

**Returns:** *Link‹›[]*

___

###  hideAllTools

▸ **hideAllTools**(): *void*

*Defined in [canvas.ts:157](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L157)*

Hides tools of all shapes on the canvas.

**Returns:** *void*

___

###  onElementSelected

▸ **onElementSelected**(`cb`: function): *void*

*Defined in [canvas.ts:176](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L176)*

React to user clicking on an element.

**Parameters:**

▪ **cb**: *function*

Callback function that is executed when the user clicks on an element.

▸ (`cellView?`: CellView): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cellView?` | CellView |

**Returns:** *void*

___

###  onLinkSelected

▸ **onLinkSelected**(`cb`: function): *void*

*Defined in [canvas.ts:185](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L185)*

React to user clicking on a link.

**Parameters:**

▪ **cb**: *function*

Callback function that is executed when the user clicks on a link.

▸ (`cellView?`: CellView): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cellView?` | CellView |

**Returns:** *void*

___

###  setToOrigin

▸ **setToOrigin**(): *void*

*Defined in [canvas.ts:126](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L126)*

Sets canvas to origin.

**Returns:** *void*

___

###  triggerElementPointerdown

▸ **triggerElementPointerdown**(`element`: Element): *void*

*Defined in [canvas.ts:135](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L135)*

Triggers element pointer down event.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | Element | Joint element.  |

**Returns:** *void*

___

###  triggerLinkPointerdown

▸ **triggerLinkPointerdown**(`link`: Link): *void*

*Defined in [canvas.ts:147](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L147)*

Triggers link pointer down event.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`link` | Link | Joint link.  |

**Returns:** *void*

___

###  unhighlightAllElements

▸ **unhighlightAllElements**(): *void*

*Defined in [canvas.ts:78](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L78)*

Unhighlights all the elements on the canvas.

**Returns:** *void*

___

###  unhighlightElement

▸ **unhighlightElement**(`model`: Element): *void*

*Defined in [canvas.ts:89](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/canvas.ts#L89)*

Unhighlights one specific element on the canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | Element | Joint element.  |

**Returns:** *void*
