[@sbpmjs/modeler - v1.0.0](../README.md) › [ReceiveStateTransitionOptions](receivestatetransitionoptions.md)

# Interface: ReceiveStateTransitionOptions

Representation of receive state transition options.

## Hierarchy

* [LinkOptions](linkoptions.md)

  ↳ **ReceiveStateTransitionOptions**

## Index

### Properties

* [message](receivestatetransitionoptions.md#message)
* [sender](receivestatetransitionoptions.md#sender)
* [source](receivestatetransitionoptions.md#source)
* [target](receivestatetransitionoptions.md#target)

## Properties

###  message

• **message**: *string*

*Defined in [common/types.ts:257](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L257)*

Defines a message that is received by a subject.

___

###  sender

• **sender**: *string*

*Defined in [common/types.ts:253](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L253)*

Defines a subject that sends a message.

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
