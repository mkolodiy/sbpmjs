[@sbpmjs/modeler - v1.0.0](../README.md) › [StateOptions](stateoptions.md)

# Interface: StateOptions

Representation of state options.

## Hierarchy

* [ElementOptions](elementoptions.md)

  ↳ **StateOptions**

## Index

### Properties

* [description](stateoptions.md#description)
* [isEndState](stateoptions.md#optional-isendstate)
* [isStartState](stateoptions.md#optional-isstartstate)
* [position](stateoptions.md#position)

## Properties

###  description

• **description**: *string*

*Inherited from [ElementOptions](elementoptions.md).[description](elementoptions.md#description)*

*Defined in [common/types.ts:113](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L113)*

Defines description that will be shown besides the icon of the element.

___

### `Optional` isEndState

• **isEndState**? : *boolean*

*Defined in [common/types.ts:152](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L152)*

Defines if a state is an end state.

**`default`** false

___

### `Optional` isStartState

• **isStartState**? : *boolean*

*Defined in [common/types.ts:146](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L146)*

Defines if a state is a start state.

**`default`** false

___

###  position

• **position**: *[Coordinates](coordinates.md)*

*Inherited from [ElementOptions](elementoptions.md).[position](elementoptions.md#position)*

*Defined in [common/types.ts:117](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L117)*

Defines position on the canvas where the element should be added at.
