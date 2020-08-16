[@sbpmjs/modeler - v1.0.0](../README.md) › [SendStateTransitionOptions](sendstatetransitionoptions.md)

# Interface: SendStateTransitionOptions

Representation of send state transition options.

## Hierarchy

* [LinkOptions](linkoptions.md)

  ↳ **SendStateTransitionOptions**

## Index

### Properties

* [message](sendstatetransitionoptions.md#message)
* [receiver](sendstatetransitionoptions.md#receiver)
* [source](sendstatetransitionoptions.md#source)
* [target](sendstatetransitionoptions.md#target)

## Properties

###  message

• **message**: *string*

*Defined in [common/types.ts:236](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L236)*

Defines a message that is sent to a subject.

___

###  receiver

• **receiver**: *string*

*Defined in [common/types.ts:232](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L232)*

Defines a subject that receives a message.

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
