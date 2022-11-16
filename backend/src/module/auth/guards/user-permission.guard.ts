import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';

@Injectable()
export class UserPermissionGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validPermission: string[] = this.reflector.get('permissions', context.getHandler());

    if ( !validPermission ) return true;
    
    const req = context.switchToHttp().getRequest();
    const usuario: Usuario = req.user;
    if ( !usuario ) {
      throw new InternalServerErrorException('Usuario no existente.');   
    }

    return true;
  }
}
