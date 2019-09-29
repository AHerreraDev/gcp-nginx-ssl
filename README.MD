##Following configuration tested under a NGINX Server on Debian 9 (stretch)

### Install Node/npm
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
node --version
```

### PM2
PM2 will help us run the application in the background (instead of in the console)<br>
To install PM2 globally:<br>
`npm install pm2 -g`

Inside the application folder run:<br>
`pm2 start index.js`

If the server reboots, make sure that the application goes back up.
The following command will make a bootup script: <br>
`pm2 startup ubuntu`

Check the status of the application:<br>
`pm2 status`

### Create a GCP Firewall rule for your VM instance
Add a network tag to your instance, for example: 'http-server'.
Then, create a GCP Firewall rule that targets 'http-server' tags and allows ingress on port 8080
Make sure to enable HTTP(S) on ports 80, and 443


### NGINX Reverse Proxy
Install NGINX:<br>
`sudo apt install nginx`

Configure default nginx configuration:<br>
`sudo nano /etc/nginx/sites-available/default`

Edit the location in the server block.
This configures your reverse proxy to forward traffic to your app:<br>
```
location / {
    proxy_pass http://localhost:8080; #or whatever port your app runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

```

NOTE: Make sure to restart the VM instance/server for these changes to take effect<br>

Check configuration file:<br>
`sudo nginx -t`

### Update Local Ubuntu Repositories & install software-properties-commong package
`sudo apt-get update`<br>
`sudo apt-get install software-properties-common`<br>

### Install dirmngr
`sudo apt-get install dirmngr --install-recommends`

### Add SSL with Let's Encrypt (CA)
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

### Optional: Just get a Certificate
`sudo certbot certonly --nginx`<br>

### Userful links
Learn more about Certbot: https://certbot.eff.org/<br>
Let's Encrypt: https://letsencrypt.org/getting-started/<br>

