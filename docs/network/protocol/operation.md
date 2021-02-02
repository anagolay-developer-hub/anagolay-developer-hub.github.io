# Operation

Is the action that has a defined structure for input (function parameters) and output (return values).

::: tip
Operation is a definition of the implementation. The implementation can be written in any language and executed anywhere.
:::

::: tip
THINK ABOUT THIS! WHAT IF WE FLIP THE FLOW OF THE DEFINITION AND EXECUTION?
:::

## Definition

Before we can really use the operations we must define some rules and standardize the definition and execution.

At the moment there are three types or groups of operations that affect its execution.

1. **USER** is a user-facing operation. It's a Flow breaking operation
2. **SYS** is a system operation. Default and most used operation group. It's not Flow breaking operation
3. **FLOWCONTROL** is a flow control operation. On Error is a Flow breaking operation, on success is not.

See all the types in the [rule definition](/sensio-network/rule#definition).

Besides the execution groups the operation can have additional _Verification Group_ which is the one or more Rule type. In this way we can assign the operation to specific Rule type. If the operation is generic enough we are adding the `gen` value to the group and if it's not _Flow Breaking_ we are adding additional group of `sys`.

The **USER** is considered to be a _Flow breaking_ action, it requires user input and interaction which halts the flow execution. The state of the flow must be saved somehow, and it's handled by the implementation. `sn_input` operation takes any allowed operation output type as its input parameter, then returns that without modifying, which make the flow to continue and keeps the same types of the operation in the same level (**SYS**).

Here is the list of the rules:

- The operation cannot access the output of another operation on the same level.
- The operation must have at least one incoming parameter which is passed by the children operations or directly when we start the execution flow.
- Each operation definition must have all the data that are defined by the Sensio Network. There are no optional parameters rather than default empty values respectful of the definition.
- There can be only one operation type and only one **USER** per level and it has to be a direct child of `sn_input`
- First level operation cannot contain **USER** type of the operation
- The last execution level, or first level in the definition will ALWAYS be serialized with the `cbor` and created the CID using the `sn_cid` operation. There is no need to add the `sn_cid` or `sn_cbor_enc` operations since they don't know how to handle the Operation name. See [Proof](/sensio-network/proof) for more info.

Operation interface looks like this. For full example see [this](#full-operation-definition).

```ts
// Operation interface
export interface Operation {
  id: PoeId;
  data: {
    name: string; // max 128(0.12kb) characters, slugify to use _
    desc: string; // max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    extra: Extra[]; // when operation needs extra info on tech used, like different packages for the same operation ( phash to use the blockhash instead of something else)
    childrenOutputs: ByteArray[];
    input: BasicInputParam[]; // what operation accepts in the implementation. these are the params of the function with the types
    output: OperationOutput;
    hashing: {
      algo: string; // default blake2b
      bits: number; // default 256
    };
    encoding: {
      algo: string; // default hex
      prefix: boolean; // default true
    };
    groups: ForWhat[];
    // this is the sum of all ops and the ops of the ops. tells how many operations this operation has. Based on this number we will decide which op is going to be executed first. This also tells which op has the longest chain or the deepest child op
    priority: number;
    ops: Operation[];
  };
}
```

## Create operation

For now creating the operation is only available through the Sensio Network JS SDK. We are working hard to write this part of the documentation.

## ⌚ Updating / Replacing

::: tip
@TODO Maybe add the `op.prev` field!!!
:::

## Nesting and Priority

::: tip
At the moment we don't have the nesting depth limit.
:::

Operations can be nested to create more complex execution flows. Many times an operation will be complex, in that case we need to be split into many dependent operations. If the operation doesn't exist there is a way to [create operation](#create-operation).

Here is the example on how nesting works:

```
| metadata_hash has 3 ops
  >___ perceptual_hash has 0 ops
  >___ meta_document_id has 0 ops
  >___ meta_serial_number  has 2 ops
    +______ meta_make has 1 ops
      |_________ meta_create_date has 0 ops
    +______ meta_lens_model has 0 ops
| raw_pixels_hash has 2 ops
  >___ perceptual_hash has 0 ops
  >___ meta_original_document_id has 0 ops
```

Before the operation is saved to the blockchain we need to count amount of ALL children this operation contains, including children of the children. Based on this number we are going to determine the execution flow. See more [on execution](#execution).

This illustrates the calculation of the `priority` field.

```
- op                    = 12
  - child               = 7 (7 = (1 + 4) + 2 direct child)
    - child             = 1
      - child           = 0
    - child             = 4
      - child           = 3
        - child         = 0
        - child         = 1
          - child       = 0
  - child               = 3
    - child             = 2
      - child           = 0
      - child           = 0
- op 2                  = 1
  - child               = 0
```

## ⌚ Function signature

Based on the Operation definition we can create the basic implementation.
In general ALL of the implementations should have the same structure with the first argument always being `childrenOutputs` which is an array of `OperationOutput`. Note that `childrenOutputs` **can be an empty array but must exist as the first argument**. Similarly the return type is based on the `operation.output` value.

```ts
import { ByteArray } from '@sensioNetwork/types';

interface IncomingParams {
  incomingParam1: ByteArray;
  incomingParam2: ByteArray;
}

interface OperationOutput {
  op_name: string;
  output: Uint8Array;
}

async function genericOperation(childOutputs: OperationOutput[], params: IncomingParams): Promise<OutputType> {
  return 'Let us pretend this of the type OutputType';
}
```

## Flow Control

We need flow control operations:

1. `sn_match_all` - all the child operations output must match
2. `sn_match_none` - none the child operations output must match

If the `sn_match_*` fails the execution must be stopped and no other operation executed. From the implementation point of view, this can be a promise that rejects or throws an error. Regardless how the exit is done it must be handled properly and flow must not continue.

::: tip
Due to the nature of the blockchain `sn_match_some` flow control operation cannot be implemented. It's not deterministic. How? The idea behind the **sn_match_some** operation it that some outputs must be the same, this can mean that not overtime the same operations will be the same. Correct me if i am wrong.
:::

Flow control operations are [segment](#segments) breaking operations.

## Default operations

1. `sn_split` -- takes in the name of the operation and its output then splits that in to N copies of the same operation with different values. See [example](#sn_split)
2. `sn_cid` -- creates [CID](/glossary#cid) from given ByteArray
3. `sn_cbor_enc` -- encodes the input ByteArray to [CBOR](https://cbor.io/)
4. `sn_cbor_dec` -- decodes the the input [CBOR](https://cbor.io/) Buffer or ByteArray
5. `sn_hash` -- creates a cryptographic hash from given ByteArray. Here for the legacy systems. Use `sn_multihash` when possible
6. `sn_multihash` -- creates a [multihash](/glossary#multihash) from given ByteArray
7. `sn_input` -- this operation accepts any valid operation output and returns it. Very useful when dealing with **USER** operations. I must have a child operation

::: tip
sn_input revisit it must have one-to-one relationship, one child one output
:::

## Segments

The Segment is a list of operations that are executed independently of the rest of the flow. The goal of the Segment is to create groups of operations that can be chained to create single value which is then passed to other functions for verification.

At the beginning of each segment we pass the value to the first function. This value must be know to the implementor.

::: tip
All the function outputs in the flow must be used, we cannot have orphan outputs.
:::

### Building Segments

Algorithm how to build segments is shown below.

![operation-execution-building-algorithm](/assets/operation-execution-building-algorithm.jpg)

## Execution

---

::: tip
Child operation is any operation that is defined in the `ops` field.
:::

We are using BOTTOM-TO-TOP execution approach in which the child operation output is passed in the parent function as an incoming parameter.

This approach seems to be best choice since the operations are executed separately and outputs are passed to the parent via input arguments. This way the operation can take/receive what it needs and return the output which makes it smaller and less dependent on the parent. In order this approach to work we need to:

1. `preparePlan` this will take ALL operations and prepare the execution plan.

   1. sort in DESC order based on the field called `op.priority` which is the number of how many children and grandchildren operations current operation has. Read more about this in [create section](#create-operation)
   2. each operation is then processed until the last child (a leaf) is found, this leaf is the start of the execution.

2. `buildPlan` at this stage we are going backwards and link the operations for the exec order, essentially in this step we are creating segments. We can use dynamic imports and build an array with the function and maybe the argument definition. See [build segments](#building-segments)

3. `executePlan` this will take as the argument the array of operations and start executing the flow.

### Execution Structure

```ts
export type PrepOpsForExec = Array<string[] | [string[]]>;

const execOpFlowArray: PrepOpsForExec = [
  // Segment 1 --  block  before the User Interaction op
  ['sn_cid', 'create_qr_code'],
  // Segment 2 --  user interaction block
  ['take_photo_and_upload_qrcode'], // take_photo_and_upload_qrcode(generateQrCodeOutput)
  // Segment 3 --  block  after the User Interaction op
  [['sn_input', 'sn_cid'], 'sn_match_all', 'sn_prepare_ownership_statements'],
  // Segment 4 -- user interaction block
  ['user_sign'],
  // Segment 5 -- non user interaction block
  ['sn_input', 'sn_save_statements'],
];
```

Let's explain above code. This is roughly how it should look like in the implementation. Replace `string` with the `function` ready for the execution and you have the real deal.

The `['sn_cid', 'create_qr_code'],` is interpreted like this. Function `sn_cid` is to be executed first and the output of this operation is to be passed into the `create_qr_code` function as input parameter. This is simple example of a parent receiving the output of a direct child operation. Following code snippet `[['sn_input', 'sn_cid'], 'sn_match_all', 'sn_prep_statements'],` is little more complex.

Did you notice the similarities? The zero index is not a string, it is the list of strings, the rest are just strings as in previous example. This Array on the zero index means that these operations are direct children operations of the function that is on the next index (index one) and that means that the outputs of zero index must be passed as input parameters to the their parent which is on the index one. The signature is of the output varies, but the length must be the same as the length of the processed index (in this case index zero).

So how do we pass the information around after the **USER**? Since there can be only one **USER** on one level and it must be direct child operation of `sn_input` we pass the output to the first `sn_input` we see in the next segment. In our case for the `take_photo_and_upload_qrcode`, `sn_input` is inside the array that is accessible via `segment3[0][0]`, if it would be like in the last line then we would just pass it to `segment5[0]` and continue.

This code snippet shows how the operations output values are passed around and how we do the checks.

::: tip
@TODO on the improvements
`const verificationData = await sn_cid(data);` can be memoized given the same data. This could save ~200ms
:::

```ts
/////// Segment 1
const verificationData = await sn_cid(data);
const qrcode = await createQRCode(verificationData);
/////// Segment 1

/////// Segment 2
// stop here. the last op is user interaction
const decodedData = await takePhotoAndUploadQRCode(qrcode);
// user uploads the image, continue
/////// Segment 2

/////// Segment 3
const input = snInput(decodedData);
const verificationData = await sn_cid(data);

if (!(await snMatchAll([input, verificationData]))) {
  throw new Error('cannot proceed');
}

const prepStatements = await snPrepareOwnershipStatements(dataNeeded);
/////// Segment 3

/////// Segment 4share
// stop here. the last op is user interaction
const signedStatements = await snUserSign(statements, identity);
// user uploads the image, continue
/////// Segment 4

/////// Segment 5
const input2 = snInput(signedStatements);
const prepStatements = await snSaveStatements(input2);
/////// Segment 5
```

Do you notice how we need to know the data when we start the flow?

## Implementation

::: danger
Implementation of an Operation must be a pure function!
:::

For now we are focusing on building the JS SDK with code generation. The SDK is written in Typescript and it provides all the tools for creating operation, rules and proof as well as the saving and querying the Sensio Blockchain.

Regardless of the implementation language it is possible to query the blockchain and retrieve all the types, operations, and rules then use the code generation to generate the basic implementation.

### NodeJS / Browser

ALL operation functions are returning a promise using tye `async` keyword with the addition of the `op.output` value as a Typescript type. Check the conventions we are using to determine the correct type.

Type Conventions:

- `ByteArray` = `Uint8Array`

## Examples

### sn_split

```ts
const statements: Statement[] = await snCreateStatements([signedStatement1, signedStatement2]);

const splitForProof: { k: string; v: string }[] = await snSplit('sn_save_statements', statements);

[
  {
    k: 'sn_save_statements',
    v: 'bafk21321wec0x98cu9e12ehidhsada', // await sn_cid(sn_cbor_enc(statements[0])),
  },
  {
    k: 'sn_save_statements',
    v: 'bafk21321wec0x98cu9e12ehidh3332', // await sn_cid(sn_cbor_enc(statements[1])),
  },
];
```

### Full operation definition

```ts
/**
 * Content identifier
 * base32, dag-cbor
 */
type CID = string;

// Generic type ALL identifiers have
type PoeId = CID;

// @TODO heavy WIP
export interface Statement {
  id: PoeId;
  data: {
    name: string; // max 128(0.12kb) characters, slugify to use _
    holder: string;
  };
}

interface BasicInputParam {
  name: string; // max 32 chars, utf8
  desc: string; // max 64 chars, utf8
  type: 'ByteArray' | 'Statement';
  default?: any;
}

// This is done so we can import it via import {ByteArray} from '../interfaces' together as any other interface. check test-gen.ts
export type ByteArray = Uint8Array;

/**
 * For now this is the same as input and the implementation needs to check the does output.type === input.type for the connected operation. We should work on this more.

 * UPDATE: Child OperationOutput can be input of parent operation.
 */
interface OperationOutput {
  op_name: string;
  output: Uint8Array;
}

/**
 * We do this by passing the child Operation output array to the parent operation as the first argument.
 * */

// Example parent operation metadataTag implementation
function metadataTag(childrenOutputs: OperationOutput[], tag: string): OperationOutput {
  childrenOutputs.map(c => c.output[tag]);
}

// Example usage
// NOTE: childrenOutputs is required param even if the array we are passing is empty!
metadataTag([], 'OriginalDocumentID');

export enum ForWhat {
  Generic,
  Photo,
  Camera,
  Lens,
  SmartPhone,
  USER,
  SYS,
  FC,
}

// Operation interface
export interface Operation {
  id: PoeId;
  data: {
    name: string; // max 128(0.12kb) characters, slugify to use _
    desc: string; // max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    input: BasicInputParam[]; // what operation accepts in the implementation. these are the params of the function with the types
    output: OperationOutput;
    hashing: {
      algo: string; // default blake2b
      bits: number; // default 256
    };
    encoding: {
      algo: string; // default hex
      prefix: boolean; // default true
    };
    ops: Operation[];
    group: ForWhat[];
    priority: number; // this is the sum of all ops and the ops of the ops. tells how many operations this operation has. Based on this number we will decide which op is going to be executed first. This also tells which op has the longest chain or the deepest child op
    prev: PoeId | '';
  };
}
```

## Operation execution-definition diagram

![operation-execution-diagram](/assets/operation-execution-bottom-top.jpg)
