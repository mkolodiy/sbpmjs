[@sbpmjs/modeler - v1.0.0](../README.md) › [MessageTransitionOptions](messagetransitionoptions.md)

# Interface: MessageTransitionOptions

Representation of message transition options.

## Hierarchy

* [LinkOptions](linkoptions.md)

  ↳ **MessageTransitionOptions**

## Index

### Properties

* [isBidirectional](messagetransitionoptions.md#optional-isbidirectional)
* [source](messagetransitionoptions.md#source)
* [target](messagetransitionoptions.md#target)

## Properties

### `Optional` isBidirectional

• **isBidirectional**? : *boolean*

*Defined in [common/types.ts:215](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L215)*

Defines is a message transition goes in both directions.

___

###  source

• **source**: *Cell | [Coordinates](coordinates.md)*

*Inherited from [LinkOptions](linkoptions.md).[source](linkoptions.md#source)*

*Defined in [common/types.ts:201](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L201)*

Defines a source element.

___

###  target

• **target**: *Cell | [Coordinates](coordinates.md)*

*Inherited from [LinkOptions](linkoptions.md).[target](linkoptions.md#target)*

*Defined in [common/types.ts:205](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L205)*

Defines a target element.
