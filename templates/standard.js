export default ({
  root,
  port = 80,
  index = 'index.html index.htm index.nginx-debian.html',
  domains = 'example.com www.example.com'
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
