# Getting started

## Installation

How to install the Node in developer mode

```yaml
version: '3'
services:
  proxy:
    image: jwilder/nginx-proxy
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs
  node:
    image: anagolay/node:0.2.0-dev
    restart: always
    environment:
      - VIRTUAL_HOST=node.anagolay.network
      - VIRTUAL_PORT=9944
    # ports:
    #   - "30333:30333"
    #   - "9933:9933"
    #   - "9944:9944"
    volumes:
      - 'anagolay_data:/data'
    command: anagolay --dev  --no-telemetry --rpc-external --unsafe-ws-external --rpc-cors all
volumes:
  anagolay_data:
```
