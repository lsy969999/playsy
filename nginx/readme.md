https
```bash
apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

sudo certbot certonly --standalone  -d playsy.xyz -d api.playsy.xyz
```