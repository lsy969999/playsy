FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사 도커 캐시 이용
COPY package-lock.json .
COPY package.json .
RUN npm install

# 소스 코드 복사
COPY . .

RUN npx prisma generate

RUN npm run build


# 애플리케이션 실행
# CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
CMD ["npm", "run", "start:prod"]