import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAsistenciagrupoDto } from './dto/create-asistenciagrupo.dto';
import { UpdateAsistenciagrupoDto } from './dto/update-asistenciagrupo.dto';
import { AsistenciaGrupo } from './entities/asistenciagrupo.entity';

@Injectable()
export class AsistenciagrupoService {
  private readonly logger = new Logger('AsistenciaGrupoService');

  constructor(
    @InjectRepository(AsistenciaGrupo)
    private readonly asistenciaGrupoRepository: Repository<AsistenciaGrupo>,
  ) {}

  create(createAsistenciagrupoDto: CreateAsistenciagrupoDto) {
    return 'This action adds a new asistenciagrupo';
  }

  findAll() {
    return `This action returns all asistenciagrupo`;
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

  async store() {}

  async storeAsistenciaDefaultForInscripcionGrupo(fkidasistencia: string, day: number, month: number, year: number, weekDay: number) {
    try {
      const days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
    ];
      const asistenciaGrupoCreate = this.asistenciaGrupoRepository.create( {
        inscripcionGrupo: {
          idinscripciongrupo: fkidasistencia,
        },
        day: day,
        mes: month,
        year: year,
        nameday: days[weekDay],
        created_at: this.getDateTime(),
      } );
      const asistenciaGrupoSave = await this.asistenciaGrupoRepository.save( asistenciaGrupoCreate );
      return asistenciaGrupoSave; 
      
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} asistenciagrupo`;
  }

  update(id: number, updateAsistenciagrupoDto: UpdateAsistenciagrupoDto) {
    return `This action updates a #${id} asistenciagrupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistenciagrupo`;
  }
}
