import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as QRCode from 'qrcode';
import * as speakEasy from 'speakeasy';
// import * as speakeasy from 'speakeasy'

@Injectable()
export class AppService {

  allAuthKeys = new Map();

  async getHello() {
    await QRCode.toFile(`./qrcodes/test_${Date.now().toString()}.png`, "test", { type: 'png' });
    const data = await QRCode.toDataURL("checking")
    log('QR details', data);
    return 'Hello World!';
  }


  async generateQR(body: any) {
    // secreat key generator
    let key: any = {};

    if (!this.allAuthKeys.get(body.username)) {
      key = speakEasy.generateSecret({ length: 25 });
      this.allAuthKeys.set(body.username, key);
    } else {
      key = this.allAuthKeys.get(body.username);
    }

    // sample auth key generated
    // const auth_key = {
    //   ascii: ':tlT6/]WJfs>>P]kbAamt6G@p',
    //   hex: '3a746c54362f5d574a66733e3e505d6b6241616d7436474070',
    //   base32: 'HJ2GYVBWF5OVOSTGOM7D4UC5NNRECYLNOQ3EOQDQ',
    //   otpauth_url: 'otpauth://totp/SecretKey?secret=HJ2GYVBWF5OVOSTGOM7D4UC5NNRECYLNOQ3EOQDQ'
    // };

    log('auth key', key);
    const data = await QRCode.toDataURL(key.otpauth_url);
    log('QR details', data);
    // const qrCode = `<img src="${data}"></img>`
    return { imageSrc: data };
  }

  async verifyUserToken(body: any) {
    log(body);
    const key = this.allAuthKeys.get(body.username);
    // sample auth key generated
    // const auth_key = {
    //   ascii: ':tlT6/]WJfs>>P]kbAamt6G@p',
    //   hex: '3a746c54362f5d574a66733e3e505d6b6241616d7436474070',
    //   base32: 'HJ2GYVBWF5OVOSTGOM7D4UC5NNRECYLNOQ3EOQDQ',
    //   otpauth_url: 'otpauth://totp/SecretKey?secret=HJ2GYVBWF5OVOSTGOM7D4UC5NNRECYLNOQ3EOQDQ'
    // };

    const userStatus = speakEasy.totp.verify({ secret: key.base32, token: body.userToken, encoding: 'base32' });
    log('User Token Verification Status', userStatus);
    return { status: userStatus };
  }
}
