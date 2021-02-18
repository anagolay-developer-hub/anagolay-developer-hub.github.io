---
title: Operation
sidebarDepth: 1
---

# Operation

## Overview

In the attempt to create transparent process and verifiable proofs, we need to be able to create trustworthy building blocks. Operations are exactly that.
Operation has a defined structure for input (function parameters) and output (return values).

Terms:

- Operation Definition: JSON like structure that is stored on the chain and it defines the operation
- Operation Implementation: Source code that is executed

The purpose of the Operation is to solve one problem; deterministic outcome for any given data. This sounds trivial for simple implementations, but for more complex it is not.

The goal is to provide a machanism for creating transparent process based on well structured inputs and outputs.

## Definition

Operation Definition is JSON like structured piece of information. It describes the Operation, its dependencies ( we call them children ), hashing, encoding, decoding functions, its inputs and outputs. Defining the Inputs and Outputs gives us ability to link them into even more complex Operations.

Here is the Typescript interface of Operation Definition:

```typescript
// not all interfaces are show
enum ForWhat {
  'GENERIC', // 1
  'PHOTO', // 2
  'CAMERA', // 3
  'LENS', // 4
  'SMARTPHONE', // 5
  'USER', // 6
  'SYS', // 7
  'FLOWCONTROL', // 8
}
// Operation interface
interface Operation {
  // This is the content_address_of(data), typeof string
  id: GenericId;
  data: {
    // These are the hard coded limits, to prevent the Network abuse. max 128(0.12kb) characters, slugify to use _
    name: string;
    // These are the hard coded limits, to prevent the Network abuse. max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    desc: string;
    // what operation accepts in the implementation. these are the params of the function with the types
    input: InputParamsDefinition[];
    // Our Operation output.
    output: OperationOutput;
    // Operation that does hashing
    hashOp: Operation;
    // Operation that does encoding
    encodeOp: Operation;
    // Operation that does decoding
    decodeOp: Operation;
    // The groups of the operation, this is used to determine the Execution Flow
    groups: ForWhat[];
    // Legacy field. Number of all operation children and grandchildren
    priority: number;
    // these are the children operations that this operation depends on
    ops: Operation[];
  };
}
```

### `id`

A [content identifier](./../../glossary.md#cid) of the `data` property and it's done using the [`op-sn-cid`](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/snCid) operation.

### `data.input`

List of params that operation accepts. If operation doesn't have child operations this property must contain single item, if the operation has children then the length of this property must be the same as the length of the `data.ops` property.

Signature of single input param:

```typescript
export interface SnInputParamsDefinition {
  data: output;
  decoded: outputDecoded;
}
```

Source code for the [input definition](https://gitlab.com/anagolay/network-js-sdk/-/blob/master/sdk/types/src/Anagolay-type-mappings.ts#L141)

More info on how to add a child operation can be found [here](#child-operations).

### `data.output`

The return value of the operation. This property is the most critical part of the definition, it allows operations to understand what kind of data is returned. This property directly maps to the `data.input` property when [adding children](#child-operations).

Signature:

```typescript
export interface SnOperationOutput {
  desc: string; // NO limit so far. Markdown or regular text but not HTML
  output: SnByteArray; // for brevity showing only one option, there are many in the actual interface DEFINITION
  decoded: SnFileBuffer; // for brevity showing only one option, there are many in the actual interface DEFINITION
}
```

Source code for the [output definition](https://gitlab.com/anagolay/network-js-sdk/-/blob/master/sdk/types/src/interfaces/operations/interfaces.ts#L14)

### `data.hashOp`

This operation is used for hashing the data.

Default value of this property is `op-sn-cid`, this is encouraged way to build self describing identifiers.

### `data.encodeOp`

This operation will be used for encoding the data and the value of this property must match the opposite operation in the `data.decodeOp`

Default value of this property is `op-sn-encode-hex`, which creates the hexadecimal value with `0x` prefix.

### `data.decodeOp`

This operation will be used for decoding the data and the value of this property must match the opposite operation in the `data.encodeOp`

Default value of this property is `op-sn-decode-hex`, which decodes from both `0x` prefixed hexadecimal value and non prefixed.

::: warning not implemented
This is not implemented, this is new PROPOSAL
:::

### `data.groups`

Groups affect operation execution inside the [rule](./rule.md).

1. **USER** is considered to be a _Flow breaking_ action, it requires user input and interaction which halts the flow execution. The state of the flow must be saved somehow, and it's handled by the implementation
2. **SYS** is a system operation. Default and most used operation group. It's not Flow breaking operation
3. **FLOWCONTROL** is a flow control operation. On Error is a Flow breaking operation, on success is not

To learn more about the execution read [How operations are executed](#execution)

### `data.priority`

::: warning @TODO

legacy field, remove as soon as you can.
REason why: Before i thought we should sort them but now when we are mapping `childOutput[0]=parentInput[0]` we don't need to do this anymore. Another reason why this was introduced was the assumption that the longest tree will contain the same operation accepting the same data so we can use memoisation technique and cache the call. This is still the concern but i 'm sure we'll find the solution down the road.

:::

## Implementation

Each defined operation must have corresponding implementation, a source code that is exectable. Implementation can be written in any language able to provide the functionality of the operation definition.

Currently we are focusing on implementing the operations for nodeJS and browser environments. All our Operations are written in Typescript and compiled to CommonJS but developers can use any programming or scripting language.

### NodeJS / Browser

All operations outputs are `Promises`. You can use the `.then()` or `await` to wait for the result. Operations will throw the errors when they fail in execution, so be sure to `try...catch` if you are using `await` and `.catch()` if not.

## Structure

Source code for below shown operation can be found [here](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/snImageRawPixels)

This is the basic file structure of every operation implementation. If any files are missing from this list the operation will not be accepted as correct implementation, but additional files will be fine.

```sh
operations/snImageRawPixels/
├── lib # created when we package the operation
├── LICENSE
├── node_modules # dependencies
├── package.json
├── README.md
├── scripts
│   └── prepublish.sh # used for copying the LICENSE, package.json and README.md files into the lib
├── src
│   ├── config.json
│   ├── config.ts
│   ├── index.spec.ts
│   ├── index.ts
│   ├── interfaces.ts
│   ├── module.spec.ts
│   └── module.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo # created when we package the operation
```

Let's go through the main files:

### `config.ts` and `config.json`

These files hold the operation [DEFINITION](#definition) one stored on the chain, they have same content but serve different purpose.

`config.ts` file is loaded in TS files to check the input and output params, among other things.

`config.json` is not used at the moment. It is a legacy file and it may be removed in the future.

### `index.ts`

entry point when we require the operation. This file basically re-exports `src` folder.

### `module.ts`

Main file that contains the implementation. This file must contain 2 functions.

- `execute` function which must be default export. This function is used for automatic operation execution starting with latest child
- `camelCase(definition.data.name)` function which is just an export. This is the function where implementation must take place

::: warning PROPOSAL
why not `camelCase(definition.data.name)` rename to `main`. this will make the development more straightforward and developers don't have to think about naming the function correctly.

Think about making the execute understand the Generics of the deepest child. Maybe code generation would be useful here???
:::

## Child Operations

Operation can have N amount of child operations. Each child is just a regular operation that can have its own children.

We define the children in the `data.ops` field.

Main reasons for adding the child operations are:

- reducing the complexity of the operation implementation
- separation of concern
- reusability

There are two ways to add a child operation: Manual and using the CLI.

When using manual adding then you need to be careful to correctly write the `input` params which are the `output` of the children in the order in which child operation is in the list and make sure that the operation version is the latest on the chain. Failing to do so, the parent operation will either fail in the execution because of wrong types or execution will wrongly process the child outputs.

When using CLI tool you need to add the operation names and the tool will auto generate the `input` params for you and correctly resolve the dependencies of the child operation. This approach will get the latest version of the child operation and add as a child.

Mapping between the `input -> output` is done sequentially going through the child operations. The first definition of the parent input must match to the first child's output, second parent input to the second child's output. All input params must be passed together in order to parent has all the information it needs to do the job.

::: warning @TODO

Double check:

- the execution of the operation in the `core` package to see is this implemented or not.
- CLI tool auto-generation of the operation
  :::

::: warning PROPOSAL
This is current implementation. We already have seen that this will not be scalable and the network types are going to be very painful to maintain. We are in researching on how to replace this with structured way so that is possible to verify the same data on the chain.

One possible approach is to use PROTO files, but we will see is this solution feasible on the chain.

**We do not support adding more than one direct child due to the complexity that would entail to execute the parent operation. We are planning to support that soon.**
:::

## Execution

As mentioned in [Structure module.ts](#module-ts) important function for executing the operation in full is called `execute`. It takes care of the recursive execution of all children before it actually executes its own main function.

The `execute` function always will start from the LEAF, or deepest child possible, then working its way up towards the main operation. This is tree traversal starting from bottom -> top each child passing its output to parent. The `execute` function requires the input to be the same as the lowest child input, since that is where the execution flow starts. The return params will always be ones that are defined in the Operation Definition.

The non default export of `camelCase(definition.data.name)` takes only the input that its needed to execute itself. The return params will always be ones that are defined in the Operation Definition.

::: danger Use carefully
BEWARE of using non default export function. It increases the complexity of your code. It is up to you to correctly execute ALL child operations and validate/transform the outputs before you can execute the main operation.
:::

Check out the source code for the [Execute Operation](https://gitlab.com/anagolay/network-js-sdk/-/blob/master/sdk/core/src/executeOperation.ts#L21)

Function Signatures are:

```ts
import { InputParams, ReturnParams } from './interfaces';
/**
 * Extract Only Raw pixels from the image
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns the raw pixel bytes without metadata`) and decoder function
 */
export default function execute<T>(params: T): Promise<ReturnParams>;
/**
 * Extract Only Raw pixels from the image
 * @param {InputParams} params InputParams
 * @return  output (Returns the raw pixel bytes without metadata`) and decoder function
 */
export declare function snImageRawPixels(params: InputParams): Promise<ReturnParams>;
//# sourceMappingURL=module.d.ts.map
```
