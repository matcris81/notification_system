import { Controller, Injectable } from "@nestjs/common";
import { NotificationsGateway } from "./notifications.gateway";

@Injectable()
export class NotificationsService {
    constructor(private readonly gateway: NotificationsGateway) {}

    sendNotification(orderId: string, message: any) {
        this.gateway.notifyCustomer(orderId, message)
    }

    register(orderId: string, orderNumber: number) {
        this.gateway.registerCustomer(orderId, orderNumber.toString())
    }
}