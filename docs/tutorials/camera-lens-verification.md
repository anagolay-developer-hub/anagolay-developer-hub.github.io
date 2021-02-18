---
title: Equipment Verification
---

# Creating the PoCLO statement and claiming

In the [**STEP 1**](./general-intro.md) we created PoE for our photo, camera and lens. Transaction ID (`TXID`) is saved and now we can continue with the second step where we create the PoCLO verification statement and claim the [ownership](../glossary.md#ownership).

> [!TIP]
> Rule is simple, if there is PoE and no PoCLO, equipment is not verified and ownership is not claimed.

**Difference between Claim and Verification is that Claim is the signed statement of the verification process. Verification is the process where user proves to the system that it owns the camera/lens and that in reasonable time(7h) was able to prove it.**

Process from the user perspective:

User will see in the app that we detected the equipment and some of it is not verified, and ownership statement is not claimed. There will be a process available within the app which will guide the user to verify the equipment and claim the copyright. After the user successfully finished the flow, ownership statement must be assigned to the user.

Process from the system perspective:

After the successful[**STEP 1**](./existence.md) the TXID for the equipment is save in the local DB and available for querying. _This approach is not decentralised because it's not meant to be, at this stage._ When user checks the equipment page within the app, we will check fined all the equipment in our database and show it to the user. For ones that `pocloTXID` doesn't exist we are going to suggest to start the verification flow. When flow is started user will have limited amount of time in which they can accomplish the verification or the verification will be logged as a failure. At that point user will start losing the [credibility](../glossary.md#user-credibility) for each failed verification until they reach the lower limit where all the verifications will halt, including the claiming of the copyright statements. At that point user will have to go through the process of gaining the credibility (which is not known at this point) to enable the verification and claiming features.

In the[**STEP 1**](./general-intro.md) we can request the rules for the specific equipment and save it to our local DB for the faster retrieval but now we are writing unoptimised flow for the sake of understanding it so we will request the rules every time for every unverified equipment. PoCLO is able to verify camera+lens combo as well as only camera or lens. For the sake of simplicity we will use single unit verification, camera. Rules are requested using the method `getRulesFor(cameraID)`, this will read search the [leaf](../glossary.md#leaf-node) PoE statement for that ID. PoCLO will return error if the ID is not found in PoE, or the ID has proven verification process and claim attached to different user. If all validations pass, we will get the response from the PoCLO in the JSON format which we need to execute.

Executing the rules.

In the response there are several important fields for verification process, they are `rules`, `@challenge` and `verificationHash`. `@challenge` is the payload that we will be verifying. The of generating the `@challenge` hash is explained [here](../glossary.md#generate-challenge-hash). We start by checking the validity of the rules, which means calculate the `verificationHash` using the `verificationHashRules` then comparing two values, if they match we continue the process, if they don't then something is wrong and we must report it (how? for not throw error and log it). Next we start with executing the rules. It is not single process, it has user interaction. Start the process by looping the `rules` array sequentially (from first to last) with output of executed rule passing in as an input of the next rule only if `output=true`. Before we show the QRCode to the user which will be used to verify we must create it using the first rule in the `rules`. We store the QRCode to the IPFS and get the link, which will be needed for creating the verification statement. Users sees the link and executes the rules that are marked as `userAction=true`. User also sees the timer that states the `ttl` param in the verification process, which says how long user has time to complete the We respond to the flow by executing the rules as the user progresses. Upload the photo of the QRCode to IPFS and save the link. After the successful upload we must verify that content of the uploaded QRCode and one that we generated are the same. Next is the rule `action=read_metadata`, we read the metadata and continue to next rule passing the output respecting the `format` param to next rule which will use byte-to-string encoding specified in `algo` field. Next we will create local variable which sill hold the payload extracted from the metadata of the photo that contains the QRCode which we offer to the user to sign it. This doesn't mean that user already claimed the ownership, it is in case the verification of the metadata on the blockchain succeeds, we can instantly create the claim statement, because user signed it with their private key. After user signs the statement we send that the the blockchain using the `api` rule. Following that rule we will make the needed api call using the `transport` as our config. If successful this rule returns the transaction IDs for both, verification and claim statement. At this point user has verified the equipment and claimed the ownership of it. Congrats 👏

> [!NOTE]
> Exact Flow on how to sign (Private key is required and master passphrase) it is not yet decided. We have a good idea how to accomplish that with the AnagolayNetwork but not how to accomplish that with SSI.

# Test QRCode

![Qr code for the rules](/assets/qr-code.png)
