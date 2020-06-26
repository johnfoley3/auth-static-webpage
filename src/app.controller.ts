import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('*')
  rootHtml(@Req() req: Request, @Res() res: Response): void {
    const path = req.params[0] ? req.params[0] : 'index.html';

    return res.sendFile(path, { root: './html' }, err => {
      if (err) {
        return res.sendFile('404.html', { root: './html' });
      }
    });
  }
}
