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
