https
https://velog.io/@wlstjdwkd/SSL-docker-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-ssl-%EC%A0%81%EC%9A%A9
```bash
apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

sudo certbot certonly --standalone  -d playsy.xyz -d api.playsy.xyz

# 이후 도커 컴포즈에 - /etc/letsencrypt:/etc/letsencrypt 볼륨 매핑 추가 한다.
# 이후 nginx.conf에 80 은 return 301 https://$host$request_uri; 하고, 443 listen serverblock 만든뒤,
# ssl 속성을 넣어준다. ssl_certificate, ssl_certificate_key, ssl_protocols, ssl_prefer_server_ciphers
```


```bash
certbot renew
```