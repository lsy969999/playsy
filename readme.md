```bash
root .env 파일에
BACK_DATABASE_URL
환경변수 넣어줘야 한다.

dev의경우
NGINX_ENV_CONF=.dev
넣어주자
```

```bash
docker-compose -f docker-compose-blue.yml up -d

docker-compose -f docker-compose-green.yml up -d

conf upstream 바꾸기

docker-compose -f docker-compose-green.yml down

docker-compose -f docker-compose-blue.yml down
```

```bash
docker-compose -f docker-compose-infra.yml up -d
docker-compose -f docker-compose-infra.yml down
```



deploy blue -> green
```bash
# git pull
git pull

# green deploy
docker-compose -f docker-compose-green.yml up -d

# nginx blue conf 제거
rm /etc/nginx/conf.d/nginx.host.blue.conf

# nginx green conf 복사
cp /home/ubuntu/playsy/nginx/nginx.host.green.conf /etc/nginx/conf.d/

# nginx reload
systemctl reload nginx

# blue down
docker-compose -f docker-compose-blue.yml down
```

deploy green -> blue
```bash
# git pull
git pull

# blue deploy
docker-compose -f docker-compose-blue.yml up -d

# nginx green conf 제거
rm /etc/nginx/conf.d/nginx.host.green.conf

# nginx blue conf 복사
cp /home/ubuntu/playsy/nginx/nginx.host.blue.conf /etc/nginx/conf.d/

# nginx reload
systemctl reload nginx

# green down
docker-compose -f docker-compose-green.yml down
```