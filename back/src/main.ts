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
        // new windstonDaily({
        //   level: 'debug',
        //   datePattern: 'YYYY-MM-DD',
        //   dirname: __dirname + '/../logs',
        //   filename: 'app.log.%DATE%',
        //   maxFiles: 30,
        //   zippedArchive: true,
        //   format: winston.format.combine(
        //     winston.format.timestamp(),
        //     utilities.format.nestLike('Nest', {
        //       prettyPrint: true,
        //     }),
        //   ),
        // }),
      ],
    }),
  });

  const configService = app.get(ConfigService);
  const serverPort = configService.get('app.SERVER_PORT');

  //cookie
  app.use(cookieParser());

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
