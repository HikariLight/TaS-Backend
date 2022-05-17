import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUpService {
  getHello(): string {
    return 'Hello World!';
  }
}
