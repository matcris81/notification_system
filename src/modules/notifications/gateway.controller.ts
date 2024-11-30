import { Body, Controller, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { NotificationsService } from "./gateway.service";
import { OrderService } from "../order/order.service";

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationsService: NotificationsService, 
        private readonly orderService: OrderService
    ) {}

    @Post(':id')
    async register(@Param() id: string) {
        console.log('register reached with ', id);
        try {
            const mealOrder = await this.orderService.findOne(id);
            this.notificationsService.register(id, mealOrder.orderNumber);
        } catch (error) {
            throw new HttpException(
                `Failed to register customer connection: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }

    @Post(':id/send-message')
    async notify(@Param() id: string, @Body() message: Map<String, String>) {
        try {
            this.notificationsService.sendNotification(id, message);
        } catch (error) {
            throw new HttpException(
                `Failed to notify customer: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
       }
    }
}