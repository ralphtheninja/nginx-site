export default ({
  root,
  port,
  index,
  domains
}) => `
server {
  listen ${port};
  listen [::]:${port};

  root ${root || `/var/www/${domains.split(' ')[0]}/html`};
  index ${index};

  server_name ${domains};

  location / {
    try_files $uri $uri/ =404;
  }
}
`
