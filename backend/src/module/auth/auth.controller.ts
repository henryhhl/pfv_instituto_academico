
import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../seguridad/usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Request() request, @Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.register(createUsuarioDto, request);
  }

  @Post('/login')
  login(@Request() request, @Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto, request);
  }

  @Post('/logout')
  logout(@Request() request) {
    return this.authService.logout(request);
  }

  @Get('/validateToken')
  @Auth()
  checkAuthStatus( @GetUser() user: Usuario ) {
    return this.authService.checkAuthToken(user);
  }

  @Get('/private-route')
  @Auth( /**  N Permissions */ )
  privateRoute( @GetUser() user: Usuario, @RawHeaders() rawHeaders: string[], ) {
    return {
      ok: true,
      request: user,
      rawHeaders,
    };
  }

}
