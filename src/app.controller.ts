import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('generate')
  generateQRCode(@Body() body: any) {
    console.log('Request Reached!');
    return this.appService.generateQR(body);
  }

  @Post('verify')
  verifyUser(@Body() body: any) {
    return this.appService.verifyUserToken(body);
  }
}
