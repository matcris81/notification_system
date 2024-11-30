import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QrCodeService } from '../qr-code/qr-code.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { QrCode } from '../qr-code/entities/qr-code.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(QrCodeService.name);
  constructor(
    private readonly qrCodeService: QrCodeService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderNumber: number, order: string[]): Promise<QrCode> {
    try {
      this.logger.debug('Processing order ', orderNumber);
      const newOrder = this.orderRepository.create({orderNumber, order});

      const savedOrder = await this.orderRepository.save(newOrder);
      this.logger.debug('New Order id: ', newOrder.id);
      
      return this.qrCodeService.generateQRCode(savedOrder.id);
    } catch (error) {
      throw new HttpException(
        `Failed to create order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      return order;
      
    } catch (error) {
      throw new HttpException(
        `Failed to find order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
