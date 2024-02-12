import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as Tesseract from 'tesseract.js';
import SmartDocParser from 'smart-docs-parser';

@Injectable()
export class OcrService {


    constructor() {

    }

    async parseFile(file: Express.Multer.File) {
        // const fileData = await Tesseract.recognize(file.buffer, 'en')
        // log('File data received: ', fileData)

        const fileData = await SmartDocParser.extractDocumentDetailsFromImage({
            document_url: './../../../qrcodes/test_1707238295770.png',
            document_type: 'AADHAAR_CARD',
            ocr_library: 'google-vision'
        });
        log(fileData)
        return fileData;
    }
}   
