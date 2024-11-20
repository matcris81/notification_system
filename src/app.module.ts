import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';``
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QrCodeModule } from './modules/qr-code/qr-code.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5435,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [],
        synchronize: true,
      }),
    inject: [ConfigService],
  }),
    QrCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
