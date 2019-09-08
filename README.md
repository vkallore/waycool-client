# `.env` file content

```
REACT_APP_NODE_PATH=src/
NODE_PATH=src/
REACT_APP_API_URL=http://localhost:4545
PER_PAGE=10
REACT_APP_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID_FOR_WAYCOOL_DOT_COM
REACT_APP_FACEBOOK_APP_ID=FACEBOOK_APP_ID_FOR_WAYCOOL_DOT_COM
```

# nginx configuration

Create New Directory for PMT related config

```
sudo mkdir /etc/nginx/pmt-config
cd /etc/nginx/pmt-config
sudo touch pmt-proxy-forward.conf pmt-proxy-options.conf pmt-proxy-post.conf pmt-proxy-get.conf pmt-proxy-put.conf pmt-proxy-delete.conf
# and paste the content to it
```

**pmt-proxy-forward.conf**

```
proxy_http_version 1.1;

proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Host $server_name;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-NginX-Proxy true;
proxy_set_header X-Forwarded-Proto	$scheme;
proxy_set_header X-Forwarded-Port	$server_port;

proxy_redirect off;
```

**pmt-proxy-options.conf**

```
if ($request_method = 'OPTIONS') {
  add_header Access-Control-Allow-Origin '*' always; #'always' can be used only if nginx >= 1.7.5
  add_header Access-Control-Allow-Credentials 'true';
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS, PUT, DELETE';

  #
  # Custom headers and headers various browsers *should* be OK with but aren't
  #
  add_header Access-Control-Allow-Headers 'Authorization,Accept,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,Range,User-Agent,X-Mx-ReqToken,X-Requested-With,x-api-key';

  #
  # Tell client that this pre-flight info is valid for 20 days
  #
  add_header Access-Control-Max-Age 1728000;
  add_header Content-Type 'text/plain; charset=utf-8';
  add_header Content-Length 0;
  return 204;
}
```

**pmt-proxy-post.conf**

```
if ($request_method = 'POST') {
  add_header Access-Control-Allow-Origin '*' always; #'always' can be used only if nginx >= 1.7.5
  add_header Access-Control-Allow-Credentials 'true';
  add_header Access-Control-Expose-Headers 'Content-Length,Content-Range';
}
```

**pmt-proxy-get.conf**

```
if ($request_method = 'GET') {
  add_header Access-Control-Allow-Origin '*' always; #'always' can be used only if nginx >= 1.7.5
  add_header Access-Control-Allow-Credentials 'true';
  add_header Access-Control-Expose-Headers 'Content-Length,Content-Range';
}
```

**pmt-proxy-put.conf**

```
if ($request_method = 'PUT') {
  add_header Access-Control-Allow-Origin '*' always; #'always' can be used only if nginx >= 1.7.5
  add_header Access-Control-Allow-Credentials 'true';
  add_header Access-Control-Expose-Headers 'Content-Length,Content-Range';
}
```

**pmt-proxy-delete.conf**

```
if ($request_method = 'DELETE') {
  add_header Access-Control-Allow-Origin '*' always; #'always' can be used only if nginx >= 1.7.5
  add_header Access-Control-Allow-Credentials 'true';
  add_header Access-Control-Expose-Headers 'Content-Length,Content-Range';
}
```

**website.conf**

```
server {
  listen 4545 default_server;
  listen [::]:4545 default_server;

  root /;

  server_name _;

  include pmt-config/pmt-proxy-forward.conf;

  proxy_cache_bypass $http_upgrade;

  proxy_redirect off;

  location /api/ {

    include pmt-config/pmt-proxy-options.conf;

    include pmt-config/pmt-proxy-post.conf;

    include pmt-config/pmt-proxy-get.conf;

    include pmt-config/pmt-proxy-put.conf;

    include pmt-config/pmt-proxy-delete.conf;

    proxy_pass http://127.0.0.1:5080/api/;
  }
}
```

# Social Login

`waycool.com` is added as verified domain for social logins. In order to run, it needs to listen to React App (while development). A proxy forward is set for the same.

## nginx config

Edit same [website nginx config](#nginx-configuration)

```
server {
  listen 443;
  listen [::]:443;
  include snippets/self-signed.conf;
  include snippets/ssl-params.conf;

  server_name waycool.com;

  ssl on;
  ssl_session_cache  builtin:1000  shared:SSL:10m;

  proxy_cache_bypass $http_upgrade;

  proxy_redirect on;

  location / {
    proxy_pass https://localhost:3000/;
  }

  # SockJS proxying
  location /sockjs-node/ {
    proxy_set_header X-Real-IP  $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;

    proxy_pass https://localhost:3000/sockjs-node/;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

## SSL Self Signed

[Detailed Post](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)

Execute following command and enter data as required.

```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```

While we are using OpenSSL, we should also create a strong Diffie-Hellman group, which is used in negotiating Perfect Forward Secrecy with clients.

```
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

### Create a Configuration Snippet Pointing to the SSL Key and Certificate

```
sudo nano /etc/nginx/snippets/self-signed.conf
```

Paste the following

```
ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
```

### Create a Configuration Snippet with Strong Encryption Settings

```
sudo nano /etc/nginx/snippets/ssl-params.conf
```

Paste the following

```
# from https://cipherli.st/
# and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html

ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
# Disable preloading HSTS for now.  You can use the commented out header line that includes
# the "preload" directive if you understand the implications.
#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

## Adjust the Firewall

```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

# Other Notes from Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

`SITE MUST work with HTTPS to have the social login works with Facebook!`

### `HTTPS=true npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
