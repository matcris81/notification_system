import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { QrCode } from './entities/qr-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([QrCode])
  ],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}
