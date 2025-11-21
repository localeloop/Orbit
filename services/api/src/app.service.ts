import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Orbit CMS V-0.001 alpha';
  }
}
