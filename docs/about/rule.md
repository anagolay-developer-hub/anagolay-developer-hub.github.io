---
title: Rule
sidebarDepth: 1
tags: process, transparent, evidence
---

# Rule

::: warning @TODO

1. go through the all rule implementations and map the way it works
2. evaluate the possibilities when there is no deterministic result due to the external apis like `sn_save_statements`
3. `sn_save_statements` is not following the Operation rule where one operation can have only one input

:::

## Overview

Rule is the definition of the process which must return the data that are used to create proofs or statements.

Rules are application agnostic, meaning they can be executed in any environment where [Operation has its implementation](./operation.md#implementation). This allows developers to include any Rule in their applications to generate some outputs. Additional benefit of the Rule is that multiple developers can execute the same Rule and given the same input data they all must come to the same outputs. This approach allows us to verify the validity of the data independently from the applications or blockchain solution.

Read more about execution [here](#execution).

## Definition

Rule Definition is JSON like structured piece of information. It describes the Rule, its dependencies for proof generation and opeartion for saving the data.

When defining the rule we must follow certain guidelines which are necessary for creating the proof params.

The guidelines are:

1. rule must fail if any operation fails, throwing `Error`
2. rule must not call external API to save the state
3. rule must not call external API and get different data on different executions
4. rule must not return `100%` different values for the same input data
5. rule can have the `saving` operation that is executed after the execution flow
6. rule can return `< 100%` same values for the similar input data

---

Interface Definition

```ts
// Types
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

interface Operation {
  id: GenericId;
  children: Operation[];
}

// Top level structure
interface SnRule {
  // This is the content_address_of(data), typeof string
  id: GenericId;
  // data container
  data: {
    // incremented value +1 for every update. Update creates new Rule linking back to previous using the parentId field
    version: number;
    // Rule name. max 128(0.12kb) utf8 characters
    name: string;
    // Rule description. max 512(0.5kb) utf8 characters
    desc: string;
    // Rule creator. A DID string in format `did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/anagolay` this must be the network address -- for now,
    creator: string;
    // Rule groups, this is used to determine the Execution Flow
    groups: SnForWhat[];
    // Parent Rule. Everytime user updates the Rule definition new rule must be created.
    parentId: GenericId;
    // Operations that are executed to create the proof
    ops: Operation[];
    // Rule saving operation
    saving: Operation || null;
  };
}
```

### Invalidations / Replacing / Updates

There will be a time when a rule must be invalidated and replaced. The way how we accomplish that is through a `parentId` field.

When we derive new rule from another rule, `version` field must be incremented by `1`.

A rule can be derived only from the rules which share the same `groups`. For example, we cannot create a new rule with the group containing `Photo` from the a rule that has the `Lens` type. The two are not compatible as they work with different sets of data.

## Implementation

> Rules exec might actually need proper template for executions. Not ALL rules will need this, the generic ones like ones with no user interaction and where all input params are known can be executed in a generic way with dynamic imports

## Execution

Rule Execution is the process of accepting the incoming data and passing it to the LEAF operation then executing them sequentially in order `child->parent` until we reach the first level where the opeartions are defined. This will result in the output values that we call `proof params` which are used to verify the incoming data and to create PoE or Statements and save them to the chain using the `saving` operation.

Due to the nature how [Operation Groups](./operation.md#data-groups) work, the execution is not straightforward and requires few additional steps. We need to create a execution plan that will understand which operations can be executed without user interaction and when to stop execution and wait for user input. The operation that halts the flow we call _Flow breaking operation_. When creating the plan we need to create certain rules on how the operations behave and how they pass the data.

Here is the list of the execution rules:

- The operation cannot access the output of another operation on the same level
- The operation must have at least one incoming parameter which is passed by the children operations or directly when we start the execution flow
- All operation on the same level must have at least one similar `groups`
- There can be only one **USER** group per level
- **USER** operation must be a direct child of `sn_identity`

---

Execution flow is split into the segments. Each segment is a group of operations that are executed independently of the rest of the flow. The goal of the Segment is to create groups of operations that can be chained to create single value which is then passed to other functions for verification.

At the beginning of each segment we pass the value to the first function.

::: warning
First input value for each segment must be know to the implementation.
:::

Before we can execute the Rule we need to build a **execution plan**.

First we need to traverse the tree and find the [leaf opeartion](../glossary.md#leaf-operation) ( deepest child in the tree ) then start creating segments which, once done, form a **execution plan**.

Segment creation flow chart:

![Segment creation](/assets/rule-segment-building.jpg)

The Execution Plan:

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

Behind the scenes how rule is executed:

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

const identity = 'urn:pgp:131231231231231';
const prepStatements = await snPrepareOwnershipStatements(dataNeeded);
/////// Segment 3

/////// Segment 4share
// stop here. the last op is user interaction
const signedStatements = await snUserSign(prepStatements, identity);
// user uploads the image, continue
/////// Segment 4

/////// Segment 5
const input2 = snInput(signedStatements);
const prepStatements = await snSaveStatements(input2);
/////// Segment 5
```

## Resources

- [https://en.wikipedia.org/wiki/Proof\_%28truth%29](https://en.wikipedia.org/wiki/Proof_%28truth%29)
- [https://en.wikipedia.org/wiki/Evidence](https://en.wikipedia.org/wiki/Evidence)
- [https://en.wikipedia.org/wiki/Necessity_and_sufficiency](https://en.wikipedia.org/wiki/Necessity_and_sufficiency)
- [https://en.wikipedia.org/wiki/Truth_table](https://en.wikipedia.org/wiki/Truth_table)
- [https://en.wikipedia.org/wiki/Commutative_property](https://en.wikipedia.org/wiki/Commutative_property)
