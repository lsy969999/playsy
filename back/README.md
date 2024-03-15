```bash
pscale auth login
pscale connect playsy main --port 3309
```


```bash
docker build . -t "playsy-back:v1.0"
docker run -p 7080:7080 -p 7081:7081 playsy-back:v1.0
docker exec -it charming_kowalevski /bin/sh 
pm2 start ecosystem.config.cjs 
pm2-runtime start ecosystem.config.cjs 
```