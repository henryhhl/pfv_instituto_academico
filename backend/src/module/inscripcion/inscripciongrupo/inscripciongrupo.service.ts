import { Injectable } from '@nestjs/common';
import { CreateInscripciongrupoDto } from './dto/create-inscripciongrupo.dto';
import { UpdateInscripciongrupoDto } from './dto/update-inscripciongrupo.dto';

@Injectable()
export class InscripciongrupoService {
  create(createInscripciongrupoDto: CreateInscripciongrupoDto) {
    return 'This action adds a new inscripciongrupo';
  }

  findAll() {
    return `This action returns all inscripciongrupo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscripciongrupo`;
  }

  update(id: number, updateInscripciongrupoDto: UpdateInscripciongrupoDto) {
    return `This action updates a #${id} inscripciongrupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscripciongrupo`;
  }
}
