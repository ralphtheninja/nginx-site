# nginx-site

> `nginx` template cli tool for creating available site configuration

## Usage

Print a standard `example.com` site configuration to `stdout`.

```
$ npx nginx-site@latest

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

As above but with some more parameters:

```
$ npx nginx-site@latest -d example.com -d www.example.com -p 443 -r /path/to/my/root -i foo.html -i bar.htm

server {
  listen 443;
  listen [::]:443;

  root /path/to/my/root;
  index foo.html bar.htm;

  server_name example.com www.example.com;

  location / {
    try_files $uri $uri/ =404;
  }
}

```

This is all fine and dandy, but `nginx-site` doesn't assume anything and just prints to `stdout` so you have to make commands to decide where the data should go.

Normally, `nginx` configuration is somewhere under `/etc/nginx` but you need `sudo` access to write to files there. So you have to pipe the result like this:

```bash
npx nginx-site@latest | sudo tee -a /etc/nginx/sites-available/my-site
```

Note that you can have multiple `server` blocks in a configuration, so you just call `nginx-site` again with the other settings, e.g.

```bash
npx nginx-site@latest | sudo tee -a /etc/nginx/sites-available/my-site
npx nginx-site@latest -p 443 | sudo tee -a /etc/nginx/sites-available/my-site
```

## CLI

```
$ npx nginx-site@latest -H
```

```
nginx-site [options]

  -t TEMPLATE, --template=TEMPLATE  --  template type, default 'standard'
  -d DOMAIN, --domain=DOMAIN        --  server name(s), can combine multiple
  -r ROOT, --root=ROOT              --  root folder of the files to serve
  -p PORT, --port=PORT              --  port number to listen to, default 80
  -i INDEX, --index=INDEX           --  index files, can be used multiple times, defaults to basic index.html
  -e, --examples                    --  print some examples to stdout
  -h, --help                        --  print this help and exit
```

### `-t TEMPLATE`

Picks the template type. Defaults to `standard`. A template is just a function returning a template literal filled in from parameters provided by the command line.

### `-d DOMAIN`

Sets the nginx `server_name` field. Can be combined multiple times.

Also sets the nginx `root` field to the first domain, unless `-r` is used to set it explicitly.

### `-r ROOT`

Sets the nginx `root` field explicitly. See `-d` above.

### `-p PORT`

Sets the nginx `listen` fields for both `ipv4` and `ipv6`. Default is `80`.

### `-i INDEX`

Sets the nginx `index` field explicitly. Can be combined multiples.

### `-e`

Prints some examples to `stdout`.

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
