import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as QRCode from 'qrcode';

@Injectable()
export class AppService {
  async getHello() {
    await QRCode.toFile(`./qrcodes/test_${Date.now().toString()}.png`, "test", { type: 'png' });
    const data = await QRCode.toDataURL("checking")
    log('QR details', data);
    return 'Hello World!';
  }

  
  async generateQR() {
    const data = await QRCode.toDataURL("checking")
    log('QR details', data);
    return data;
  }
}
