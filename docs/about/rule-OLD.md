# Rule

A **Rule** is a defined structure which we use to generate a `Proof`.

Rules are Anagolay approach to create a standardized way of generating self-describing proofs. Each of the proofs is a combination of the operation outputs and the rule type.

::: warning NOTE

in the original explorer we use `implement the rule` (Anagolay photo rule ) to create the PoE for the photo. this will generate the proof data and then we add that as the data for PoE and assign the executed ruleId. How would that work with poclo??? since that rule creates the statements.

So the rule doesn't have to be used to create the PoE only, how about rule says what needs to do, like `save_poe` or `save_statements`. It seems we improved this a lot not thinking about the relateions.

:::

## Rule output as a payload , no saving to the chain

if rule generates the payloads only then then the user must know how to save the payload. In this way the rule can be used to regenerate the payload over and over without failing. ( This does not include the situation when there is an external API that might change the data )

Example is this rule `0x6261667932627a61636564783333726569797735636637753362366d71366f367037707a327a6b356c63716f6471776e71347a6676776c6f756465717736`

## Rule output as a list of identifiers, saving to the chain

Rule ID `0x6261667932627a6163656134767a6762646c6a666d6d63777337647464747032656b616270327133727835336f7233337066726b627235657a6232356734` is an example of the rule where the return params are IDs of the saved statements. It also saves the statements to the chain.

This example will not be able to pass next time person runs it with the same data because the saving to the chain should fail.

## Definition

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

interface SnRule {
  id: SnGenericId
  data: SnRuleData
}
 interface SnOperationReference {
  id: SnGenericId
  children: SnOperationReference[]
}

 interface SnRuleData {
  version: number
  name: string
  desc: string
  creator: string
  groups: SnForWhat[]
  parentId: SnGenericId
  ops: SnOperationReference[]
```

### Implementations

> Rules exec might actually need proper template for executions. Not ALL rules will need this, the generic ones like ones with no user interaction and where all input params are known can be executed in a generic way with dynamic imports

### Building Segments

Algorithm how to build segments is shown below.

![operation-execution-building-algorithm](/assets/operation-execution-building-algorithm.jpg)

## Execution

---

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

```md
1. rule always must return processed `ops` values
2. rule must fail if any operation fails, throwing `Error`
3. rule can save the params using the single operation << this is std exec flow
4. this will be used to create the Proofs, Statements
5. rule can be ran in verification flow passing `{save:false}` to constructor or have `verify()` method that does that internally
6. this will be used to verify the Proofs, Statements
7. rule can return < 100% same values for the same data < depends on the operations, for example the Rule that creates the photo PoE returns list of values that describe the the identifiers of the photo, if the rule returns 100% same values then we have the 100% match of the Proof, but it can happen that the photo is resized, skewed, metadata removed, in that case we can get < 100% list of values giving us the chance to see which parts are similar and deduct do we accept the input data as valid
8. every rule may have the `saving` operation that is executed after the execution flow. it save the data provided by `ops`
9. to be used as an evidence of the implemented process
10. to be widely used
11. to be robust solution for defining the process
12. to be well defined
```
