```bash
docker build . -t "playsy-front:v1.0"
docker run -p 8080:8080 -p 8081:8081 playsy-front:v1.0
docker exec -it charming_kowalevski /bin/sh 
pm2 start ecosystem.config.cjs 
pm2-runtime start ecosystem.config.cjs 
```