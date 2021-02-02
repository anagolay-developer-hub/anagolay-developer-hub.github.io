---
title: Proof of Existence (v0.1.0)
---

# Intro to Sensio Network, Rules, and Proofs

Hi, and welcome! 🙋‍♀️🙋‍♂️

This tutorial explains what Sensio Network is about and helps you create your first [Rule](/network/protocol/rule.html#rule) and [Proof](/network/protocol/proof.html#proof). Furthermore, you will learn how the two are connected and how we can use them to prove the copyright of a digital asset and equipment ownership.

## Intro

Sensio Network is the decentralized platform for creation of verifiable proof statements for any data or workflow. Using flexibility of the Rule implementation on top of the data, we create, organize, and store the proofs. These proofs can be searched, linked, compared, embedded, and published together with the original data.

Our current focus is to build a robust platform for creating, validating, storing and embedding copyrights and ownerships of multimedia files, primarily photos. We aim to create a trustless platform that anyone can use to create proofs of ownership (for photography equipment) and photo copyrights that work even if a photo was corrupted, stolen or its metadata was deleted.

_What is a Rule?_

The simplest explanation would be

> A [Rule](/network/protocol/rule.html#rule) is a defined structure which is used to generate a [Proof](/network/protocol/proof.html#proof).

Let's build a somewhat real-world case.

A user story can be something like this:

> I as a user want to be able to create the proof for my photo so that I can freely share it and not worry about copyright infringements.

This seems to be a very simple user story but it is more complex than you think. Let's break it down.

1. A photo is a complex piece of data. Apart from the image itself, it also contains a lot of self-describing information, like image dimensions, its characteristics, copyright, and so on. It can also contain camera and lens identifiers and, in most cases, GPS coordinates (which can be used to track people down). All this information is called `metadata`. The metadata standard is a requirement that the majority of image formats support. For instance, all jpeg files, the format of images you see every day on social media all over the Internet, can have metadata.
2. Copyright infringement is technically piracy or, in other words, unauthorized use of creative work. In our case an example would be someone [remixing](glossary.md#remix) a photo you took, publishing it under their name and potentially earning money using your creative work.
3. Sharing (publishing) a photo, a simple action as it seems, also includes a number of background interactions. Web-services do on-the-fly image resizing, aiming for optimal download speeds that are essential for the best user experience. Unfortunately, by doing so these web-services also often remove all the traces of photo copyrights, by removing the metadata.

Now you already see that our user story is not that simple. Metadata being removed when you upload an image on social media is a big challenge for keeping track of copyright. Furthermore, some major platforms are forcing you do give them a license to use your images. When accepting the general terms of use, you are granting them a right to make money from your photos, which no longer have metadata with your copyright.

But what if you could have a proof that 'follows' your photo everywhere, in any rendition, any sharpness correction, and works even if the metadata was at some point deleted? It would give you, as an author, an upper hand and control over the photos that you can use to set your terms, get due appreciation, or even earn some money.
Let's have a look what is needed to create such proof.

### Proof definition

Proof is sufficient evidence or sufficient argument for the truth of a proposition. In our case, this means that we need to find a way to generate a proof that is SUFFICIENT to be truthy, not necessarily 100% true. Several projects that verify Proof of Existence look for a 100% match. Yet with photos, which could be easily altered by just a clarity or brightness adjustment, this approach does not work.

If we apply any hashing method on the photo that was slightly changed, it will never match the hash created for the original photo. The two hashes will be completely different. The result leads us to the false conclusion: the two photos in our example are unique, no copyright infringement spotted. Clearly, this approach fails; we need to look for a different way to implement copyright proof for the photos. The one that is based on sufficient evidence. To provide such evidence we use identifiers.

By now, you know that each photo contains two distinct _layers_ of data. The first one is the pixel layer, the one that we can see with our eyes. To see the second layer, that contains metadata about the photo, we need the machines' help. We could create two separate identifiers for each layer of our photo by hashing the data. However, in this case, as soon as we introduce any change (e.g. brightness adjustment), both of the hashes will change. That is not necessarily a bad thing since that would give us a way to create a unique identifier for every change, but that is not what we are looking for.

We need to come up with a way of generating an identifier that is created from the collection of identifiers that describe various parts of data about the photo.

Rule to the rescue!

We said that the rule is a defined structure that is used to generate a proof. We don't want the proof to change 100% when the data changes. With our approach, when changing data (i.e. adjusting size, color, brightness) we will see the proportional change in the proof.

How? The answer is in the term called `Operation`. It is the most essential part of the rule. The rule can have as many operations as it needs to describe the proof, and each operation can have as many operations as it needs to create a meaningful identifier. Meaningful for the machines, not us.

Operation is a definition of the implementation. If the operation consists in 'defining how to ride a bicycle' its implementation can be done on ANY bicycle of any size.

Now, when we have all the knowledge, let's dive in and create the rule and the proof.

## Create the rule

First of all, go to http://explorer.sensio.network/ the website we will be using to create the rules and the proofs.

This screen shows you many things but 3 things of interest to us:

1. Create your own custom rule ( **Create Rule** orange button )
2. **Create default rules**, they are Sensio rules, available to use for Camera, Lens, and Photo. They come preinstalled so you don't have to create them.
3. A user, Alice is the user who will OWN the proof, it will be the account that will pay the network fees. You can also choose Bob for the fun of it.

Let's click on the **1. Create PoE Rule** in the navigation bar or that orange **Create Rule** button

![click-create-rule](/assets/tutorials/create-rule-navbar.png)

You should see the page which allows you to add the rule of your design. Remember a rule must have at least ONE operation, any operation.

Be sure you add a nice recognizable name, something that is different.

Try to create something of your own having this image as a guide.

> NOTE: Leave Hashing, Encoding, and Prefix as it is, as other then default values are not implemented yet for them.

![create rule](/assets/tutorials/create-custom-rule.png)

Click **SUBMIT** and wait a bit, follow the number of the rules and you will see that now it has +1. When the saving is done you will be redirected to the list of rules, where you can inspect them and their operations.

Congrats!!! 🎉👏

## Create the proof

Now let's create the proof.

Select any jpeg image, it can be with, or without metadata. You can try both options, that's the fun part.

The creator is you, enter your identifier. For now, it can be an email or such, we are planing to implement fully-fledged Self Sovereign identities in the not so far future.

Select the rule that you created in the previous step.

Click on the **1. Implement the Rule** to execute the operations and generate the Proof.

When the **2. Create the Proof** becomes available click it to save the proof.

Now you relax and wait for the proof to be saved and included in the block.
At the end of the page, you can see the events produced by the saving of the proof.
If you are familiar with the logging in the console check it out, there is much more output.

When you see the `Proof is created` message it means, well, congrats!!! 🎉👏

For an exercise implement a new rule or just click 'create proof' again without any change. See what happens.

Here is the proof I created.
![create rule](/assets/tutorials/create-proof.png)
