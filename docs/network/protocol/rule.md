# Rule

A **Rule** is a defined structure which we use to generate a `Proof`.

Rules are Sensio's approach to create a standardized way of generating self-describing proofs. Each of the proofs is a combination of the operation outputs and the rule type.

## Definition

```ts
// Types
enum ForWhat {
  Generic = 'gen',
  Photo = 'ph',
  Camera = 'cam',
  Lens = 'len',
  SmartPhone = 'sp',
  User = 'usr',
  Sys = 'sys',
  FlowControl = 'fc',
}
```

#### Invalidations / Replacing / Updates

There will be a time when a rule must be invalidated and replaced. The way how we accomplish that is through a `parent` field.

When we derive new rule from another rule, `version` field must be incremented by `1` and all operations need to be saved with the new rule. Let's say that we have a saved rule with 3 operations and we want to add few more operations. The ONLY way is to create new rule with ALL of the operations that we want to keep from original rule plus operations we want to add.

A rule cannot be derived from a different rule type. For example, we cannot create a new rule with the type `Photo` from the a rule that has the `Lens` type. The two are not compatible as they work with different sets of data.

#### Example

Implementing the same rule on top of the same data will always give us the same proof. While implementing the same rule on a similar data will provide a similar proof.

If you find this confusing, check the definition of a proof [here](#proof).

We can use this approach to compare generated proofs and to look for the similarities. Excellent example is proof generation for a Photo. Check it out [here](#proof).

To be a valid rule, the `ops` field must have at least one operation.

If you are interested in example check out the [tutorial](/tutorials)

Generic Rule structure:

```ts
// Types
enum ForWhat {
  Generic = 'generic',
  Photo = 'photo',
  Camera = 'camera',
  Lens = 'lens',
  SmartPhone = 'smartphone',
  USER = 'user',
  SYS = 'sys',
  FC = 'fc'
}

// Content identifier
type CID = string;

// Generic type ALL identifiers have
type PoeId = CID;

// Generic user identifier, for now PoeId but in the future fully fledged SSI
type CreatorId = PoeId(UUID | URN | SSI | ANY);

// Rule interface
interface Rule {
  id: PoeId;
  data: {
    version: number;
    name: string;
    desc: string;
    creator: CreatorId;
    forWhat: ForWhat[]; // maybe add the [] here so the rule can be applied to more than one thing. For example [Camera, Lens]
    parent: PoeId;
    ops: [Operation];
  };
}
```

### Implementations:

> Rules exec might actually need proper template for executions. Not ALL rules will need this, the generic ones like ones with no user interaction and where all input params are known can be executed in a generic way with dynamic imports

<!--  -->
