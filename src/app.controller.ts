import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  html(@Req() req: Request, @Res() res: Response): void {
    const path = this.appService.pathOrDefault(req.params[0]);

    return res.sendFile(path, { root: './html' }, err => {
      if (err) {
        return res.sendFile('404.html', { root: './html' });
      }
    });
  }
}
