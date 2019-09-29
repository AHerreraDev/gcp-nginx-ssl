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
Add a network tag to your instance, for example: 'http-server'
Then, create a GCP Firewall rule that targets 'http-server' tags and allows ingress on port 8080
Make sure to enable HTTP(S) on ports 80, and 443


### NGINX Reverse Proxy
Install NGINX
`sudo apt install nginx`

Configure default nginx configuration:
`sudo nano /etc/nginx/sites-available/default`

Edit the location in the server block:
```
server_name yourdomain.com www.yourdomain.com;

location / {
    proxy_pass http://localhost:5000; #whatever port your app runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

NOTE: Make sure to restart the server for these changes to take effect
```


Check configuration file:
`sudo nginx -t`
