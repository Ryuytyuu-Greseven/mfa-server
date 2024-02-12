import { Body, Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from '../services/ocr.service';

@Controller('ocr')
export class OcrController {
    constructor(private ocrService: OcrService) { }

    @Post('/parse-image')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileToExtract(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        return this.ocrService.parseFile(file);
    }
}
