import { Module } from '@nestjs/common';
import { NotificationController } from './gateway.controller';
import { OrderService } from '../order/order.service';
import { NotificationsService } from './gateway.service';

@Module({
  controllers: [NotificationController],
  providers: [OrderService, NotificationsService],
})
export class OrderModule {}
