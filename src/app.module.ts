// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JuiceModule } from './juice/juice.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    JuiceModule,
    JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  // Bu yerda 'uploads' papkasi ko'rsatiladi
      serveRoot: '/uploads',  // URL orqali rasmga murojaat qilish
    }),
    AuthModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AppModule { }
