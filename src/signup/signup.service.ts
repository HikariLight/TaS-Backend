import { ForbiddenException, Injectable } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class SignUpService {

  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'Signup module';
  }

  async signup(dto: SignUpDTO) {

    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password_hash: hash
        }
      });

      return 'success';
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002: Unique constraint failed
        if (error.code === 'P2002') {
          throw new ForbiddenException("Credentials taken");
        }
      }

      throw error
    }
  }
}
