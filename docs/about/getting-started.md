# Getting started

## Installation

How to install the Node in developer mode

```yaml
version: '3'
services:
  node:
    image: anagolay/node
    restart: always
    ports:
      - "30333:30333"
      - "9933:9933"
      - "9944:9944"
    volumes:
      - 'anagolay_data:/data'
    command: anagolay --dev  --no-telemetry --rpc-external --unsafe-ws-external --rpc-cors all
volumes:
  anagolay_data:
```

## Populating the chain with the initial data

At this moment there is no simple way to init the chain with the Operations and Rules. We are working hard to provide you with the easy setup. Contact @woss_io on Twitter or on our discord server id you would like to know more. 

For now to interact with the alpha version of the chain please go to [Hosted polkadot explorer](http://dev-explorer.anagolay.network/#/explorer).

