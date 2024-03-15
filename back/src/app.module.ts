import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { WsModule } from './ws/ws.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SampleModule } from './sample/sample.module';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';
import swaggerConfig from './config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, appConfig, swaggerConfig],
    }),
    PrismaModule,
    AdminModule,
    WsModule,
    AuthModule,
    SampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
