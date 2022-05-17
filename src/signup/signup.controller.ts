import { Controller, Get, Post } from '@nestjs/common';
import { SignUpService } from './signup.service';

@Controller()
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Get()
  getHello(): string {
    return this.signUpService.getHello();
  }

  @Post()
  checkAuth(): string {
      return "sup";
  }
}
