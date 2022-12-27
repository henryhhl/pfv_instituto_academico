import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger('ProfileService');

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly usuarioService: UsuarioService,
  ) {}

  findAll() {
    return `This action returns all profile`;
  }

  private getDateTime() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    
    month = (+month < 10) ? "0" + month : month;
    day = (+day < 10) ? "0" + day : day;

    let hour = date.getHours().toString();
    let minutes  = date.getMinutes().toString();
    let segundos = date.getSeconds().toString();
    let milliSeconds = date.getMilliseconds().toString();

    hour = (+hour < 10) ? "0" + hour : hour;
    minutes = (+minutes < 10) ? "0" + minutes : minutes;
    segundos = (+segundos < 10) ? "0" + segundos : segundos;

    return `${year}-${month}-${day} ${hour}:${minutes}:${segundos}:${milliSeconds}`;
  }

  async store(createProfileDto: CreateProfileDto) {
    try {
      const usuario = await this.usuarioService.findOne( createProfileDto.fkidusuario );
      if ( usuario === null ) {
        return {
          resp: 0, error: false,
          message: 'Usuario no existe.',
        };
      }
      const profileFirst = await this.findOne(createProfileDto.idprofile);
      let profilePreLoad = null;
      if ( profileFirst !== null ) {
        const { idprofile, fkidusuario, ...toUpdate } = createProfileDto;
        profilePreLoad = await this.profileRepository.preload( {
          idprofile: profileFirst.idprofile,
          ...toUpdate,
          usuario: usuario,
          concurrencia: profileFirst.concurrencia + 1,
          updated_at: this.getDateTime(),
        } );
      } else {
        const { idprofile, fkidusuario, ...toStore } = createProfileDto;
        profilePreLoad = this.profileRepository.create( {
          ...toStore,
          usuario: usuario,
          created_at: this.getDateTime(),
        } );
      }
      const profileUpdate = await this.profileRepository.save( profilePreLoad );
      const usuarioUpdate = await this.usuarioService.updateProfile( profileUpdate );
      const { 
        api_token, movil_token, web_token, concurrencia, isdelete, password, timeout,
        created_at, updated_at, deleted_at, ...usuarioRespta 
      } = usuarioUpdate;
      return {
        resp: 1, error: false,
        message: 'Perfil actualizado éxitosamente.',
        usuario: usuarioRespta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async existsUsuario(fkidusuario: string) {
    try {
      const profile = await this.profileRepository.findOne( {
        where: {
          usuario: {
            idusuario: fkidusuario,
          },
        },
        relations: { usuario: true, },
      } );
      return ( profile !== null ) ? true : false;
    } catch (error) {
      return false;
    }
  }

  async findOne(idprofile: string) {
    try {
      const profile = await this.profileRepository.findOneBy( {
        idprofile: idprofile,
      } );
      return profile;
    } catch (error) {
      return null;
    }
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
