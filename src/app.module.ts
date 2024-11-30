import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';``
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QrCodeModule } from './modules/qr-code/qr-code.module';
import { OrderModule } from './modules/order/order.module';
import { StatusModule } from './modules/status/status.module';
import { NotificationsGateway } from './modules/notifications/notifications.gateway';

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
        autoLoadEntities: true,
      }),
    inject: [ConfigService],
  }),
    QrCodeModule,
    OrderModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule {}
