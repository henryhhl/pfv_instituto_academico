
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( Usuario )
        private readonly usuarioRepository: Repository<Usuario>,

        configService: ConfigService,
    ) {
        super( {
            secretOrKey: configService.get('JWT_SECRET') || 'E5T0EsUnCodigoS3CR3T0',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        } );
    }

    async validate( payload: JwtPayload ): Promise<Usuario> {
        const { idusuario } = payload;
        const usuario = await this.usuarioRepository.findOneBy( {
            idusuario: idusuario,
        } );
        if ( !usuario ) {
            throw new UnauthorizedException( "Usuario no existe." );
        }
        if ( usuario.estado !== "A" ) {
            throw new UnauthorizedException( "Usuario no habilitado." );
        }
        return usuario;
    }
}
