import { Injectable } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import * as qrcode from 'qrcode';
import { Logger } from '@nestjs/common'

@Injectable()
export class QrCodeService {
  private readonly logger = new Logger(QrCodeService.name); // Ensure logger is properly initialized
  // url = 'https://192.168.1.100/'
  url = 'http://192.168.3.48:3000/status/'

  async generateQRCode(data: string) {
    this.logger.debug('QR Code being made')
    try {
      const qrCodeDataURL = await qrcode.toDataURL(this.url + data);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code. ' + error);
    }
  }

  findAll() {
    return `This action returns all qrCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qrCode`;
  }

  update(id: number, updateQrCodeDto: UpdateQrCodeDto) {
    return `This action updates a #${id} qrCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} qrCode`;
  }
}
