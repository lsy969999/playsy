```bash
root .env 파일에
BACK_DATABASE_URL
환경변수 넣어줘야 한다.

dev의경우
NGINX_ENV_CONF=.dev
넣어주자
```

```

docker-compose up -d

```

수동 블루그린 배포
```bash
# 이거 해주어야함
docker network create playsy_server-connection


docker-compose -f docker-compose-blue.yml up -d

docker-compose -f docker-compose-nginx.yml up -d

docker-compose -f docker-compose-green.yml up -d

conf upstream 바꾸기

docker exec playsy_nginx_1 service nginx reload

docker-compose -f docker-compose-green.yml down

docker-compose -f docker-compose-blue.yml down

docker-compose -f docker-compose-nginx.yml down
```