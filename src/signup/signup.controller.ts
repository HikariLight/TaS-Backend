import { Controller, Get, Post, Body } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import { SignUpService } from './signup.service';

@Controller("/signup")
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Get()
  getHello(): string {
    return this.signUpService.getHello();
  }

  @Post()
  async signup(@Body() dto: SignUpDTO){
    const result = await this.signUpService.signup(dto);
    if(result === 'success'){
      return "Account created successfully";
    }
  }
}
