import { Injectable } from '@nestjs/common';
import { CreateAsistenciacursoDto } from './dto/create-asistenciacurso.dto';
import { UpdateAsistenciacursoDto } from './dto/update-asistenciacurso.dto';

@Injectable()
export class AsistenciacursoService {
  create(createAsistenciacursoDto: CreateAsistenciacursoDto) {
    return 'This action adds a new asistenciacurso';
  }

  findAll() {
    return `This action returns all asistenciacurso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistenciacurso`;
  }

  update(id: number, updateAsistenciacursoDto: UpdateAsistenciacursoDto) {
    return `This action updates a #${id} asistenciacurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistenciacurso`;
  }
}
