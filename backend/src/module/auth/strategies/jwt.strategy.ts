
import { Repository } from 'typeorm';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        // @InjectRepository( Usuario )
        // private readonly usuarioRepository: Repository<Usuario>,
    ) {
        super( {
            secretOrKey: process.env.JWT_SECRET || 'E5T0EsUnCodigoS3CR3T0',
        } );
    }

    async validate( payload: JwtPayload ): Promise<Usuario> {
        return;
    }
}
