# A simple WebRTC video chat app with node and express

## Install denpendencies:
```bash
npm i express ejs socket.io uuid https

sudo npm i -g peer

```

## Install local SSL for local https service:
  Reference: <a href='https://github.com/bumblezhou/local_ssl_with_websocket?tab=readme-ov-file#1-generate-the-private-key-to-become-a-local-ca'>Generate CA, key, cert file for testing ssl use in a nodejs site</a>

## How to run:
```bash
[terminal 1]
peerjs --port 3001 --sslkey ./jackzhou.me.key --sslcert ./jackzhou.me.crt

[terminal 2]
sudo node server.js
```

[browser]
https://jackzhou.me