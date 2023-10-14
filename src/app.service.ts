import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): { message: string } {
    return { message: 'Hello World!' };
  }
}
