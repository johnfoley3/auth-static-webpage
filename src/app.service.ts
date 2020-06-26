import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  pathOrDefault(path: string): string {
    return path || '/';
  }
}
