# Statements

define the statements

```ts
const statementCameraOwnership = {
  // id = CId(hash(data))

  id: '8tWrg6LXdHSDu93FgPRasHDTPGxY54WKq3hBLDd1NQja5zzNzko5cKjtGPPJJLQXN1v7NTdkkfh2w14QSVpuB3Gbz9',

  data: {
    signatures: {
      holder: {
        sigKey: 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b',
        // sign(statement, pvtKey(sigKey))
        sig:
          'bfuws2ljnijcuoskoebieoubajvcvgu2bi5cs2ljnfuwq2cswmvzhg2lpny5cat3qmvxfar2qfzvhgidwgqxdmlrsbufeg33nnvsw45b2ebuhi5dqom5c6l3pobsw44dhobvhgltpojtq2cqnbj4ecmceifiw6v2vnnatev2gorutqvttij4tqq3hmriwi5ddgjrxkzcinayfqyzxmvxdg43jmfdts422i5lhsslkn5uvur3mnmgqut3ojzwge2tpgvmteutnj5dve22npjttctl2iuyu2vcfgvhgu2dkj5dvcnczgjetctlkkf3u26szgfhuivtjjzveu3knkrlgsdikjfuxo2lblbhhuzcxkz4us2tpnfneo3dlj5xe43dcnjygswlknbuu6v2vpjhuittijz5gomkpiratctkekjufuvdhpjhuiqjqbufe4rdenjgwuzzsjv5esmcokrdgqtlkmrwus2lxnfrtgvtjmfwvm2teinetmslokz4we2tqpjnfonl2mfltqntdi5uhmzchha3a2cspjbjfsy2vlj4fe22fpbrwwsrqkrvvmmtdnnlewwjsmqzvmmcwkvivknl2jzcxgmcunnyhmujrkjfwi2s2pjseiuspkyyfeninbjktg3dqliyxawcpivfgwulloqyfkwcvgnrvknlikfwemrtdkvyeivcujy2vgmc2nfqwy3dlmrvvurcnnvshkuzsnrnfgm2ojugqusljo5uwgsckozruoolzmrdwy5tcnfetmzlzjizfsv3ygfnfgsjwjvkec52minfdazkyijwes2tpnfruovtzlezfm5lei5dg4dikljjus42jnzhhawrsgruu62kjnrew4mdtjfwu46k2k5ddawsxkjtfswcrnfhwsslzjvceknkmkrcxqtcuiuyvmrcfgnhwuslybufe62sngfgguwjtjvdg62lgmnfgkqsbivlugz2bi5bfcstepj2dmzsbifxuurkgjjau43dimjmxmrtci5nekqsbjzdvizckkztq2csfnbdxgnlmnm3gysknkrngol2spftw6ojlmi2uwwsvm5rwwnkvhf2vmv3fifidsszzjbbu4yrxpiydcn2xnj4eumtzmqyguoinbj5dcvcnknitmtsojvuxosbwpbzwisjwozbwopj5bufd2nzlkjta2crnfuws2lkfjzccauchkaqe2rktknauorjnfuws2li',
        // sigHash = CID(sig)
        sigHash: 'bafk2bzaceah3qsqsaqfkqibi3vkknamxockuff3yfxuyib7mxrpkl4ibryshu',
      },
      issuer: {
        sigKey: 'urn:pgp:d1f5e247a976f1e3c14f0a437a6db9962ef3978e',
        // CID(sign(statement, pvtKey(sigKey)))
        sig:
          'bfuws2ljnijcuoskoebieoubajvcvgu2bi5cs2ljnfuwq2cswmvzhg2lpny5cat3qmvxfar2qfzvhgidwgqxdmlrsbufeg33nnvsw45b2ebuhi5dqom5c6l3pobsw44dhobvhgltpojtq2cqnbj4ecmceifiw6v2sjb3w6wlzkjjg63ryij4tqq3hmriwi5ddgjrxkzcinayfqyzxmvxuq43jmfdts422i5lhsslkn5uvur3mnmgqut3ojzwge2tpgvmteutnj5dve22npjttctl2iuyu2vcfgvhgu2dkj5dvcnczgjetctlkkf3u26szgfhuivtjjzveu3knkrlgsdikjfuxo2lblbhhuzcxkz4us2tpnfneo3dlj5xe43dcnjygswlknbuu6v2vpjhuittijz5gomkpiratctkekjufuvdhpjhuiqjqbufe4rdenjgwuzzsjv5esmcokrdgqtlkmrwus2lxnfrtgvtjmfwvm2teinetmslokz4we2tqpjnfonl2mfltqntdi5uhmzchha3a2cspjbjfsy2vlj4fe22fpbrwwsrqkrvvmmtdnnlewwjsmqzvmmcwkvivknl2jzcxgmcunnyhmujrkjfwi2s2pjseiuspkyyfeninbjktg3dqliyxawcpivfgwulloqyfkwcvgnrvknlikfwemrtdkvyeivcujy2vgmc2nfqwy3dlmrvvurcnnvshkuzsnrnfgm2ojugqusljo5uwgsckozruoolzmrdwy5tcnfetmzlzjizfsv3ygfnfgsjwjvkec52minfdazkyijwes2tpnfruovtzlezfm5lei5dg4dikljjus42jnzhhawrsgruu62kjnrew4mdtjfwu46k2k5ddawsxkjtfswcrnfhwsslzjvceknkmkrcxqtcuiuyvmrcfgnhwuslybufe62sngfgguwjtjvdg62lgmnfgkqsbivlugz2bi5bfcstepj2dmz2bifxuurkfki4ewr2nnnkwcsrpfnxg6qsbjnthcmzrgrvq2crymfsugmjwpfxucodhnrcvcrjwlfgwgt2qm5rxcs3xljggkwlrji4til3pifiui5rrnbbguwkgkuzxg6cnj55cw3lojjegemynbjlu45scgvatk42jkfbgumdxjvng6ojzpjcgopj5bufd2ntvmvkq2crnfuws2lkfjzccauchkaqe2rktknauorjnfuws2li',
        // sigHash = CID(sig)
        sigHash: 'bafk2bzaceay6b6tb7ddrl7klvhrsvxl464f5mtcvxnkb2c6bu5urdabiastv6',
      },
    },
    claim: {
      // poe which contains the proof
      poeCid: '8tXqFqFA1rBtNEvrEJcgwWETANs4K4NJoCTJv6st4NWDySyigZW8BdBKtQu7qNaBQEqJCM3yKFbjYdvFC2gnKiYKsL',
      // null or the statement.id value which is now revoked, transferred, expired ...
      prevId: null,
      // which rule is implemented to obtain this statement
      ruleId: '8tXqFqFA1rBtNEvrEJcgwWETANs4K4NJoCTJv6st4NWDySyigZW8BdBKtQu7qNaBQEqJCM3yKFbjYdvFC2gsasaKsL',
      // in which proportion holder holds the statement type
      proportion: {
        sign: '%',
        type: 'percentage',
        value: 100,
      },
      sub: {
        did: 'urn:serial_number:camera:083031034346',
        name: 'Daniel Maricic',
      }, // this could be the poeId of the camera
      holder: 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/Anagolay-network',
      issuer: 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/Anagolay-network',
      description: `I, $sub.name($sub.did) state that i hold $type of the $DEVICE_NAME in the proportion of $proportion.value $proportion.sign`,
      // other value is the restriction, figure out how to do statement of restriction
      type: 'ownership',
      permission: 'right',
      valid: {
        from: '2019-11-15T17:21:35Z',
        until: '2119-11-15T17:21:35Z', // valid.from + expiration
      },
      expiration: {
        type: 'years',
        value: 100,
      },
      // what happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
      onExpiration:
        'urn:Anagolay:network:rule:8tXqFqFA1rBtNEvrEJcgwWETANs4K4NJoCTJv6st4NWDySyigZW8BdBKtQu7qNaBQEqJCM3yKFbjYdvFC2gsasaweed',
    },
  },
};
```

## Structure definition

URI scheme is used for:

1. holder
2. issuer
3. subject
4.

## DIDs, Anagolay and Substrate

We would like to have the way of specifying the did that is generic SUBSTRATE based address and the way to know which service to use in order to get the information and which [service](https://w3c.github.io/did-core/#service-endpoints) is used. the `issuer` is an example where generic substrate did is used with the [DID path](https://w3c.github.io/did-core/#path) property to specify the NETWORK where that address has been used.

Check out the https://kilt.io/

`subject` is the device we are talking about. it cannot be PoE must be stored sparately and given correct ID, in case of the camera, it's the SerialNumber, if there are multiple IDs then we figure that out.
