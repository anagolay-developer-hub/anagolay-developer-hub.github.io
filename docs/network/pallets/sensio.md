# Sensio Generic Pallet

# ivor -- Implementation Versions for Operation and Rule definitions

## On code implementation and versioning

We need a way to keep track versions of the Implementation for each Operation. Each implementation will have the Operation definition written in the `config.${ext}` file which is used to tell implementation what to do and how to encode or hash values.

Now we see the problem where semver is not satisfactory because it doesn't handle the actual content. It is completely in the developers hands to make the mistake. Our proposal is to use Semver + content Hashing to get the specific version for that code implementation.

Before the module is published to designated package repository website (npmjs.com, crates.io, pypi.org ...) the code CID is calculated and added to the version.

We have 2 options, one is to use IPFS for the storage and CID calculation, and second that we shipt the module that does that based on the `SnCID` Operation.

The version would look like this `0.54.32-bafk2CID`. The `bafk2CID` is the CID of the implementation code, without installed packages like `node_modules` or others. That CID we must map with the Operation Definition which is used to create the implementation.

This pallet should handle that. It would save only verified packages and map them to the operation definition. Then developers can check the list of implementations per language for given Operation CID, check the validity and who verified it.

This could be one more incentive to use Sensio Network as a decentralized trustworthy place for operation definition implementations.

## Operation definition

Create, replace and store Operation definitions;

## Rule definition

Create, replace and store Rule definitions;
