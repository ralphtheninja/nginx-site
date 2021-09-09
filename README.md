# nginx-site -- WIP

> `nginx` template cli tool for creating available site configuration

## Usage

Print a standard config for domain `example.com` to `stdout`.

```
$ npx nginx-site -d example.com

server {
  listen 80;
  listen [::]:80;

  root /var/www/example.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name example.com;

  location / {
    try_files $uri $uri/ =404;
  }
}

```

## CLI

```
$ npx nginx-site -H
```

```
nginx-site [options]

  -t TEMPLATE, --template=TEMPLATE  --  template type, default 'standard'
  -d DOMAIN, --domain=DOMAIN        --  at least one is required, can combine multiple
  -r ROOT, --root=ROOT              --  root folder of the files to serve
  -p PORT, --port=PORT              --  port number to listen to, optional, default 80
  -h, --help                        --  print this help and exit
```

### `-r root` _(optional)_


### `-d domain` _(required)_

Must provide at least one value but can be combined multiple times. This will have effect on the `server_name` field by concatenation of all domains given.

Also sets the nginx `root` field to the first domain, unless `-r` is used to set it explicitly.

### `-t type` _(optional)_

Picks the template type. Defaults to `standard`. A template is just a function returning a template literal filled in from parameters provided by the command line.

## JavaScript API

You can also use the internals from other modules, e.g.

```js
import * as nginx from 'nginx-site'
console.log(nginx.createTemplate())
console.log(nginx.templates)
```

### `nginx.createTemplate(opts)`

TODO document parameters

### `nginx.templates`

Object containing all template functions.

## Links

* [How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
