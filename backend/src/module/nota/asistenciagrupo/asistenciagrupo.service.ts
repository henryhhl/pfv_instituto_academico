import { Injectable } from '@nestjs/common';
import { CreateAsistenciagrupoDto } from './dto/create-asistenciagrupo.dto';
import { UpdateAsistenciagrupoDto } from './dto/update-asistenciagrupo.dto';

@Injectable()
export class AsistenciagrupoService {
  create(createAsistenciagrupoDto: CreateAsistenciagrupoDto) {
    return 'This action adds a new asistenciagrupo';
  }

  findAll() {
    return `This action returns all asistenciagrupo`;
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
