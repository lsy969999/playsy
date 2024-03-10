import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistReqDto } from './dto/req.dto';
import * as bcrypt from 'bcrypt';

const bcryptSaltRounds = 10;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 회원 가입
   * 체크
   * 1. 이메일 && 가입수단 중복 체크
   * 2. 닉네임 중복 체크
   */
  async regist(data: RegistReqDto) {
    this.logger.log('regist data', data);
    const emailRegistypeCheck = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        registType: data.registType,
      },
    });
    if (emailRegistypeCheck) {
      throw 'email exists';
    }
    const nickNameCheck = await this.prisma.user.findFirst({
      where: {
        nickName: data.nickName,
      },
    });
    if (nickNameCheck) {
      throw 'nick name exists';
    }

    const hashedPassword = await bcrypt.hash(data.password, bcryptSaltRounds);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        nickName: data.nickName,
        email: data.email,
        password: hashedPassword,
        registType: data.registType,
        providerId: data.providerId,
      },
    });

    return user;
  }
}
