[@sbpmjs/modeler - v1.0.0](../README.md) › [LinkFactory](linkfactory.md)

# Class: LinkFactory

## Hierarchy

* **LinkFactory**

## Index

### Constructors

* [constructor](linkfactory.md#constructor)

### Accessors

* [selectedLink](linkfactory.md#selectedlink)

### Methods

* [add](linkfactory.md#add)
* [addSourceMarker](linkfactory.md#addsourcemarker)
* [getSelectedLinkAttributes](linkfactory.md#getselectedlinkattributes)
* [getSelectedLinkType](linkfactory.md#getselectedlinktype)
* [update](linkfactory.md#update)

## Constructors

###  constructor

\+ **new LinkFactory**(`canvas`: [Canvas](canvas.md), `container`: Element): *[LinkFactory](linkfactory.md)*

*Defined in [factories/link-factory.ts:96](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L96)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | [Canvas](canvas.md) | [Canvas](canvas.md) object used to register joint events. |
`container` | Element | [[Element]] object used to register DOM events.  |

**Returns:** *[LinkFactory](linkfactory.md)*

## Accessors

###  selectedLink

• **get selectedLink**(): *Link‹›*

*Defined in [factories/link-factory.ts:36](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L36)*

Get currently selected link.

**Returns:** *Link‹›*

Joint element.

## Methods

###  add

▸ **add**‹**A**›(`creationOptions`: [LinkCreationOptions](../interfaces/linkcreationoptions.md)‹A›): *Link*

*Defined in [factories/link-factory.ts:62](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L62)*

Creates a new link and saves it internally.

**Type parameters:**

▪ **A**: *[LinkOptions](../interfaces/linkoptions.md)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`creationOptions` | [LinkCreationOptions](../interfaces/linkcreationoptions.md)‹A› | [LinkCreationOptions](../interfaces/linkcreationoptions.md) object containing all options used to create a new link. |

**Returns:** *Link*

A new link.

___

###  addSourceMarker

▸ **addSourceMarker**(`condition`: boolean, `link?`: Link): *void*

*Defined in [factories/link-factory.ts:86](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`condition` | boolean |
`link?` | Link |

**Returns:** *void*

___

###  getSelectedLinkAttributes

▸ **getSelectedLinkAttributes**(): *any*

*Defined in [factories/link-factory.ts:51](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L51)*

Get selected link attributes.

**Returns:** *any*

___

###  getSelectedLinkType

▸ **getSelectedLinkType**(): *any*

*Defined in [factories/link-factory.ts:43](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L43)*

Get selected link type.

**Returns:** *any*

___

###  update

▸ **update**(`options`: [GenericOptions](../interfaces/genericoptions.md), `link?`: Link): *void*

*Defined in [factories/link-factory.ts:78](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/factories/link-factory.ts#L78)*

Updates a given link or as fallback a currently selected link.

**`throws`** Error when no link was passed as a parameter and if no link is selected on canvas.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [GenericOptions](../interfaces/genericoptions.md) | Update options. |
`link?` | Link | Link to update. |

**Returns:** *void*
