import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as windstonDaily from 'winston-daily-rotate-file';
import { v4 as uuidv4 } from 'uuid';
import * as basicAuth from 'express-basic-auth';

function generateShortUUID(): string {
  // UUID 생성
  const fullUUID: string = uuidv4();
  // 처음 8자리만 선택하여 반환
  const shortUUID: string = fullUUID.substring(0, 8);
  return shortUUID;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('Nest', {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
        new windstonDaily({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: __dirname + '/../logs',
          filename: 'app.log.%DATE%',
          maxFiles: 30,
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(`Nest-${generateShortUUID()}`, {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });

  // cors 허용
  const allowedOrigins = [
    'https://playsy.xyz',
    'http://playsy.xyz',
    'http://local.playsy.xyz',
    'http://localhost:5173',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      // origin이 허용된 도메인 중 하나인지 확인
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        Logger.log('origin: ' + origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
  });

  const configService = app.get(ConfigService);
  const serverPort = configService.get('app.SERVER_PORT');

  //cookie
  app.use(cookieParser());

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('swagger.user')]:
          configService.get('swagger.password'),
      },
    }),
  );

  //swagger
  const config = new DocumentBuilder()
    .setTitle('playsy')
    .setDescription('playsy api doc')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persisAutorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  //hbs
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(serverPort);

  Logger.log(`started ${serverPort} port`);
}
bootstrap();
