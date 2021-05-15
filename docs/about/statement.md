# Statements

## Overview

Statement is a record that proves the truthfulness of the [Claim](#claim) using user's cryptographic [Signatures](#signatures). On Anagolay every Statement is the product of a transparent process we call [Rule](./rule.md). At this time we support two types of statements, [Copyright](#copyright) and [Ownership](#ownership), more will be added when we see the need for it and practical usecase. The types are part of the network and cannot be deleted, updated or removed by users or validators.

## Definition

Each statement is defined by combining the Claim and the Signatures. The Claim contains the data and the rights about a subject in question while the Signatures contain the signed data which only the holder and issuer can reproduce giving them ultimate assurance of the validity and responsability for the Claim.

The `signatures.holder` is the record that links the user to a Claim, in a way that the `sig` field value is the result of signing the `claim` field with the `sigKey` private key. The `cid` field is the Content Address of the `sig` field and it is used for indexing and quick validation without knowing the actual signature.

The `signatures.sigKey` is a public key fingerprint and publicly available to everyone to verify the validity of the signature. This way the user is responsible to keep the `sigKey` private key always safe and secure, because without it the user cannot recreate the signature when asked to verify the truthfulness of this Claim, namely on the Court or in a dispute over the rights of the Subject of the Claim.

The `signatures.issuer` is the record that links the user or service to the holder of the Claim. Whoever is in this field holds huge responsibility of the Statement validity, because this is the user/account/service that verifies the implemented process and that the information which is signed by both parties is TRUE and irrefutable. Issuers must be publicly known and they stake their reputation and their utility token (THT).

For the time being anyone can be an issuer, but in the future that will be changed to a similar way how validators work.

::: warning
Being an `issuer` is a huge risk to your name and respactability on the network. If the `issuer` issues the wrong records them and all who back them are slashed and they lose the respactability which has a serious repercussions like not being able to sell/buy/rent/license any of the digital or physical media on the chain.
:::

## Structure

Statement Example from the chain:

```ts
{
  statement: {
    id: "bafy2bzacecucql3wnplymdxesbrriwev3n4jyftzrjckx6wufdrbxxhupvpds",
    data: {
      signatures: {
        holder: {
          sigKey: "urn:pgp:d6055d4aa2995dd0",
          sig: "-----BEGIN PGP MESSAGE-----rnVersion: OpenPGP.js v4.10.9rnComment: https://openpgpjs.orgrnrnxA0DAQoW1gVdSqKZXdABy8GedQdtc2cudHh0YC6/VHsicHJldklkIjoiIiwirncG9lSWQiOiJiYWZ5MmJ6YWNlYXd5dzNnaXJ5b2h0Njc0ZGlxN25wbjZ2bmRsrnN2JjeXlnenJmZnNoYnV0Y2pscXA1d3puYSIsInJ1bGVJZCI6ImJhZnkyYnphrnY2VhNHZ6Z2JkbGpmbW1jd3M3ZHRkdHAyZWthYnAycTNyeDUzb3IzM3BmcmtirncjVlemIyNWc0IiwicHJvcG9ydGlvbiI6eyJuYW1lIjoicGVyY2VudCIsInNprnZ24iOiIlIiwidmFsdWUiOiIxMDAifSwic3ViamVjdElkIjoiYmFmeTJiemFjrnZWF3eXczZ2lyeW9odDY3NGRpcTducG42dm5kbDdiY3l5Z3pyZmZzaGJ1dGNqrnbHFwNXd6bmEiLCJob2xkZXIiOiJkaWQ6c3Vic3RyYXRlOjVIbkt0b3N1bWRZrnZkhTaWZZS0JIaE5tb1h2aERBTkNVOGo4djd0YzRwNHBZN01NUC9zZW5zaW8trnbmV0d29yayIsImlzc3VlciI6ImRpZDpzdWJzdHJhdGU6NUhCcjlkU0trVGpXrncjVYTDdaSEdqUUxneGYxbmRmaW43RVJuSmQxaE4yUDd4alR4L3NlbnNpby1urnZXR3b3JrIiwiY2xhaW1UeXBlIjowLCJ2YWxpZCI6eyJmcm9tIjoiMTYxMzY3rnNjM3MTU2NyIsInVudGlsIjoiIn0sImV4cGlyYXRpb24iOnsiZXhwaXJhdGlvrnblR5cGUiOjAsInZhbHVlIjoiIn0sIm9uRXhwaXJhdGlvbiI6IiJ9wnUEARYKrnAAYFAmAuv1QAIQkQ1gVdSqKZXdAWIQQCnhWHhTSDEKSVCdXWBV1Kopld0IParnAP9W97peUbxLDLEBoWorH6XlVRe/Qenk518es5QH0zWJNwEAkbHoW4lvuADjrnS39DUhRS7nnnEGZgMeU8jnhFu8B7fgM=rn=pa7mrn-----END PGP MESSAGE-----rn",
          cid: "bafy2bzacedr7dikwmxrbggt73dflc743rs7eiyuflfrk7eues5277e2klxyji"
        },
        issuer: {
          sigKey: "urn:substrate:5GoNkf6WdbxCFnPdAnYYQyCjAKPJgLNxXwPjwTh6DGg6gN3E",
          sig: "0x400cf5e8d030569496c05b4b4352b11139bad545cd87a8a7b06c94dfbe4528ad9ac4cba0b60f7117545e65cb19251cd403205cba7e3d8c96cb29b10ef7670e04",
          cid: "bafy2bzacedmbmagmy34xuohghted2hhmfp32pqxfztom4g3766svclnu7xohw"
        }
      },
      claim: {
        prevId: null,
        poeId: "bafy2bzaceawyw3giryoht674diq7npn6vndl7bcyygzrffshbutcjlqp5wzna",
        ruleId: "bafy2bzacea4vzgbdljfmmcws7dtdtp2ekabp2q3rx53or33pfrkbr5ezb25g4",
        proportion: {
          sign: "%",
          name: "percent",
          value: 100
        },
        subjectId: "bafy2bzaceawyw3giryoht674diq7npn6vndl7bcyygzrffshbutcjlqp5wzna",
        holder: "did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network",
        issuer: "did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network",
        claimType: COPYRIGHT,
        valid: {
          from: 1613676371567,
          until: null
        },
        expiration: {
          expirationType: FOREVER,
          value: null
        },
        onExpiration: null
      }
    }
  },
  accountId: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  blockNumber: 416,176
}
```

Typescript interface:

```ts
interface SnProportion {
  /// Proportion sign, can be %
  sign: string;
  name: string;
  value: string;
}

interface SnValidity {
  /// When the validity starts, this should be DATE_TIME
  from: string;
  /// When validity ends, this is calculate Validity.from + Expiration.value
  until: string;
}

enum SnExpirationType {
  FOREVER,
  YEARS,
  MONTHS,
  DAYS,
  MINUTES,
  SECONDS,
}

interface SnExpiration {
  /// Proportion sign, can be %
  expirationType: SnExpirationType;
  /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
  value: string;
}

enum SnAnagolayClaimType {
  COPYRIGHT,
  OWNERSHIP,
}

interface SnStatementInfo {
  statement: {
    // this is the CID(data)
    id: SnGenericId;
    data: {
      signatures: {
        holder: {
          /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
          sigKey: string;
          /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
          sig: string;
          /// Content identifier of the sig field -- CID(sig)
          cid: SnGenericId;
        };
        issuer: {
          /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
          sigKey: string;
          /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
          // https://gitlab.com/sensio_group/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
          sig: string;
          /// Content identifier of the sig field -- CID(sig)
          cid: SnGenericId;
        };
      };
      claim: {
        /// Prev Anagolay Statement id in case this statement is revoked or changed
        prevId: SnGenericId;
        /// PoE id of the record in question.
        poeId: SnGenericId;
        /// Implemented rule
        ruleId: SnGenericId;
        /// In which proportion the statement is held
        proportion: SnProportion;
        /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
        subjectId: SnGenericId;
        /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
        holder: SnCreatorId;
        /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
        issuer: string;
        /// Generic type, ATM is Copyright or Ownership
        claimType: SnAnagolayClaimType;
        /// How long this statement is valid
        valid: SnValidity;
        /// Setting when the statement should end
        expiration: SnExpiration;
        /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
        onExpiration: string;
      };
    };
  };
  accountId: string;
  blockNumber: number;
}
```

## Claim

Claim is a factually-oriented proposition that describes the subject Right using the `claimType`. An example of the Claim is when person claims the Copyright or Ownership of particular item and it can back it up with enough evidence ( proofs ). Together with `Signatures` they form the legally valid Statement.

## Signatures

Signatures is the structure of `holder` and `issuer` Signature interfaces. Together they confirm and bind the claim to be seen, verified and valid.

## Copyright

On Anagolay Copyright statement is a exclusive right that holder claims over a subject in question.

## Ownership

On Anagolay Ownership statement is a exclusive right that holder claims over a subject in question.

## Identifiers

On Anagolay network **ALL** properties that end with `id` are [Content Addresses](./../glossary.md#cid) of the corresponding content parameter. On the high level definition the `id` is the CID of the `data` and for the signatures the `cid` is the CID of the `sig` property.

All other properties are identifiers that need to be put in the respective context. For example the `sigKey` is the **URN** based identifier of the public key and its value is the PK fingerprint.

## Resources:

- [https://en.wikipedia.org/wiki/Proposition](https://en.wikipedia.org/wiki/Proposition)
- [https://en.wikipedia.org/wiki/Statement\_(logic)](<https://en.wikipedia.org/wiki/Statement_(logic)>)
- [https://opencreds.org/specs/source/identity-credentials/#expressing-an-identity](https://opencreds.org/specs/source/identity-credentials/#expressing-an-identity)
- [https://w3c-ccg.github.io/ld-cryptosuite-registry/](https://w3c-ccg.github.io/ld-cryptosuite-registry/)
