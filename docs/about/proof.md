# Proof of Existence

Is a structured final output of the rule. Each proof is different in a few aspects and similar in others.

Proof params is the collection of the operation outputs mapped via operation name. A `proofId` will always be different for different data, but not the proof params. That's because the proof params are controlled completely by the rule definition and its operations.

#### Invalidations / Replacing / Updates

We can invalidate the proof by generating a new one and setting the `prev` field to the previous `proofId` we want to invalidate. In order to get the last proof which is also the valid one we must look for the proof that is not linked to any other proof, in other words where `current.proofId` does not exist in the `anyProof.prev` field.

Generic structure:

```ts
// Generic type that is result of the single operation
interface ProofParams {
  k: string; // Operation.data.op field
  v: string; // function(Operation)
}

// Generic Proof
interface Proof {
  id: PoeId;
  data: {
    ruleId: PoeId;
    prev: PoeId;
    creator: CreatorId;
    forWhat: ForWhat;
    params: [ProofParams];
  };
}
```
