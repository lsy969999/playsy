import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistReqDto } from './dto/req.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //토큰 발급 POST /token : Token
  //토큰 리프레쉬 POST /token/refresh

  //가입 POST /regist
  //탈퇴 POST /withdrawl

  //이메일로그인 POST /email : Token

  //소셜로그인 - 카카오 POST /kakao : Token
  //소셜로그인 - 구글 POST /google : Token
  //소셜로그인 - 네이버 POST /naver : Token

  @Post('/token')
  async token() {}

  @Post('/token/refresh')
  async tokenRefresh() {}

  @Post('/regist')
  async regist(@Body() data: RegistReqDto) {
    return this.authService.regist(data);
  }

  @Post('/withdrawl')
  async withdrawl() {}

  @Post('/email')
  async email() {}
}
