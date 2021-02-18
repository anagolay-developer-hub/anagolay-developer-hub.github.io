---
sidebar: auto
---

# Glossary of terms

## DID

Decentralized identifiers (DIDs) are a new type of identifier to provide verifiable, decentralized digital identity. These new identifiers are designed to enable the controller of a DID to prove control over it and to be implemented independently of any centralized registry, identity provider, or certificate authority. DIDs are URLs that relate a DID subject to a DID document allowing trustable interactions with that subject. DID documents are simple documents describing how to use that specific DID. Each DID document can express cryptographic material, verification methods, or service endpoints, which provide a set of mechanisms enabling a DID controller to prove control of the DID. Service endpoints enable trusted interactions with the DID subject.

[DID Primer](https://github.com/WebOfTrustInfo/rwot7-toronto/blob/master/topics-and-advance-readings/did-primer.md)

[Continue reading ...](https://w3c.github.io/did-core/)

## IPID

The Interplanetary Identifiers DID method `(did:ipid:)` supports DIDs on the public and private Interplanetary File System (IPFS) networks. IPFS is the distributed content addressable permanent web. More specifically, the IPID DID method utilizes the Interplanetary Linked Data (IPLD) suite of tools. The IPID DID method has minimal design goals: a DID trust anchor based on the IPFS and Libp2p protocol. In and of itself, this is not a blockchain solution. However, blockchains and other distributed ledger technologies could be utilized to anchor the artifacts of this DID methods for further enhanced security.

[Continue reading ...](https://did-ipid.github.io/ipid-did-method/)

## IPFS

IPFS is a system that hopes to change how we use the internet, so it comes with many new concepts. The guides section has an overview of major concepts in IPFS (including terms and ideas associated with distributed file systems generally), guides for specific IPFS use cases, and example projects demonstrating various ways to use the IPFS ecosystem.

[Continue reading ...](https://docs.ipfs.io/introduction/overview/)

## CID

A CID is a self-describing content-addressed identifier. It uses cryptographic hashes to achieve content addressing. It uses several multiformats to achieve flexible self-description, namely multihash for hashes, multicodec for data content types, and multibase to encode the CID itself into strings.

Concretely, it's a typed content address: a tuple of (content-type, content-address).

[Continue reading ...](https://github.com/multiformats/cid)

## Multihash

Multihash is a protocol for differentiating outputs from various well-established hash functions, addressing size + encoding considerations. It is useful to write applications that future-proof their use of hashes, and allow multiple hash functions to coexist.

[Continue reading ...](https://multiformats.io/multihash/)

## Security index

Describes smth

## Discovery Index

## Anagolay Blockchain

AnagolayNetwork's blockchain (Anagolay Blockchain) component is built on top of the interoperable [Polkadot Network](https://polkadot.network/) which

## Successful participation

Participation where the user was participating without the intention to cheat and with the correct data.

Example:

Lets say that we have a following event `Train the AI model on snake photos` where successful participation will grant each user 10THT. Each user (this is a user f the app that knows these things like Anagolay.photo) broadcast the notification about that event to all its users. Users who decide to participate must follow the rules and requirements of the event, sending the photos with `snakes` only, correctly tagged and titled. Users who follow these rules and correctly send photos upon finished event are considered to be a **successful participant** and therefor can claim their 10THT. Users who send wrong data, photo contains a dog and a cat but it's tagged as a `snake`, are considered **unsuccessful participant** due to the reasons of intentionally misguiding the training models.

> [!NOTE]
> Although that kind of misbehavior sometimes can be very much welcomed, the point is to conform to the rules of the event.

## Parachain

A parachain is an application-specific data structure that is globally coherent and validatable by the validators of the Polkadot relay chain. Most commonly a parachain will take the form of a blockchain, but there is no specific need for them to be actual blockchains. They take their name from the concept of parallelized chains that run parallel to the relay chain.

[Continue reading ...](https://wiki.polkadot.network/docs/en/learn-parachains)

## User Credibility

WIP

## Copyright

> Copyright is the exclusive right given to the creator of a creative work to reproduce the work, usually for a limited time.
>
> <sup>source [Wikipedia](https://en.wikipedia.org/wiki/Copyright)</sup>

The legality varies around the world.

## Copyright infringement

> Copyright infringement (colloquially referred to as piracy) is the use of works protected by copyright law without permission for a usage where such permission is required, thereby infringing certain exclusive rights granted to the copyright holder, such as the right to reproduce, distribute, display or perform the protected work, or to make derivative works. The copyright holder is typically the work's creator, or a publisher or other business to whom copyright has been assigned. Copyright holders routinely invoke legal and technological measures to prevent and penalize copyright infringement.
>
> <sup>source [Wikipedia](https://en.wikipedia.org/wiki/Copyright_infringement)</sup>

## Ownership

https://en.wikipedia.org/wiki/Ownership#Ownership_models

## Proof

> A proof is sufficient evidence or a sufficient argument for the truth of a proposition.
>
> <sup>source [Wikipedia Proof(Truth)](<https://en.wikipedia.org/wiki/Proof_(truth)>)</sup>

The Proof in Anagolay Network is of the same definition but upgraded with the components that are independently verifiable and calculable. this [Provability logic](https://en.wikipedia.org/wiki/Provability_logic) ?? **@TODO**

## Original Document ID

The common identifier for the original resource from which the current resource is derived. For example, if you save a resource to a different format, then sa quely identifies the resource in that format, but should retain the ID of the source file here.They are [GUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) Sometimes the cameras are not parsing the ID as they would today, they strip the `-` from the ID and ass it to the metadata. for example `C4CEBFD8B6A782A5E0DC32AFE31D6D09` equals `c4cebfd8-b6a7-82a5-e0dc-32afe31d6d09` . To test it check [Runkit by woss](https://runkit.com/woss/is-uuid-guid)

## Remix

> A remix is a piece of media which has been altered or contorted from its original state by adding, removing, and changing pieces of the item. A song, piece of artwork, books, video, poem, or photograph can all be remixes. The only characteristic of a remix is that it appropriates and changes other materials to create something new.
>
> <sup>source [Wikipedia](https://en.wikipedia.org/wiki/Remix)</sup>

## Leaf Operation

Leaf Operation is the deepest child operation in the dependency tree. This opeartion does not have any children, only parent.
