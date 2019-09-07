# `.env` file content

```
REACT_APP_NODE_PATH=src/
NODE_PATH=src/
REACT_APP_API_URL=http://localhost:4545
PER_PAGE=10
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

# Other Notes from Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

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
