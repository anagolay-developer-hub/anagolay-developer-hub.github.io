# Claiming the Copyright

After successful [**PoCLO**](./camera-lens-verification.md) we are ready to claim the [copyright](../glossary.md#copyright) of the photo. For now it is a straightforward process of signing the generated statement.
System will prepare the statement for us after we sign the statement of ownership, in another words, when we claim the ownership. We will be notified (email, push, notification in the web ui) that we have to sign the copyright statement with out private key which is located either in the browser, phone, or any other super secure place. When we sign the statement and send it using the webapp, we will receive notification that we have claimed the copyright which we can examine using provided link. Now we are ready to sell the licenses and transfer the copyright.

Diagram:

```mermaid

sequenceDiagram
  participant user
  participant app
  participant api
  participant SensioNetwork
  participant db

  api->>app: Copyright statement prepared
  app->>user: Notify about the new copyright statement
  user->>app: Signs the statement
  note over user, user: Any flow works
  app->>api: Send the signed statement
  api-->>SensioNetwork: Create the signed copyright statement
  SensioNetwork-->>api: NET_OK() here is the TXID
  api-->>db: Save the reference to the user SSI/DID/Account
  db-->>api: DB_OK()
  api->>app: Success, here is the TXID
  app->>user: Notify, congrats

```
