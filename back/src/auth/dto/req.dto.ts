import { RegistType } from '@prisma/client';

export class EmailLoginReqDto {
  email: string;

  password: string;
}

export class LogoutReqDto {}

export class RegistReqDto {
  name: string;
  nickName: string;
  email: string;
  password: string;
  registType: RegistType;
  providerId: string;
}

export class WithdrawlReqDto {}
