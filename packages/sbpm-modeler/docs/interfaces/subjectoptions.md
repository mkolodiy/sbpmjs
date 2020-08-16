[@sbpmjs/modeler - v1.0.0](../README.md) › [SubjectOptions](subjectoptions.md)

# Interface: SubjectOptions

Representation of subject options.

## Hierarchy

* [ElementOptions](elementoptions.md)

  ↳ **SubjectOptions**

## Index

### Properties

* [description](subjectoptions.md#description)
* [isMachine](subjectoptions.md#optional-ismachine)
* [position](subjectoptions.md#position)

## Properties

###  description

• **description**: *string*

*Inherited from [ElementOptions](elementoptions.md).[description](elementoptions.md#description)*

*Defined in [common/types.ts:113](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L113)*

Defines description that will be shown besides the icon of the element.

___

### `Optional` isMachine

• **isMachine**? : *boolean*

*Defined in [common/types.ts:129](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L129)*

Defines which icon (human or machine) should be used for a subject.

**`default`** false

___

###  position

• **position**: *[Coordinates](coordinates.md)*

*Inherited from [ElementOptions](elementoptions.md).[position](elementoptions.md#position)*

*Defined in [common/types.ts:117](https://github.com/mkolodiy/sbpmjs/blob/97cb194/packages/sbpm-modeler/lib/common/types.ts#L117)*

Defines position on the canvas where the element should be added at.
