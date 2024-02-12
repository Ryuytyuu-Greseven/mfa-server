import { Module } from '@nestjs/common';
import { OcrController } from './controller/ocr.controller';
import { OcrService } from './services/ocr.service';

@Module({
  controllers: [OcrController],
  providers: [OcrService]
})
export class OcrModule { }
