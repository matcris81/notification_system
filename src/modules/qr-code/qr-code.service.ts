import { Injectable } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import * as qrcode from 'qrcode';
import { Logger } from '@nestjs/common'

@Injectable()
export class QrCodeService {
  private readonly logger = new Logger(QrCodeService.name); // Ensure logger is properly initialized

  // async generateQRCode(createQrCodeDto: CreateQrCodeDto) {
  async generateQRCode(data: string) {
    Logger.log('QR Code being made')
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
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
