import { Injectable } from '@nestjs/common';
import { CreateCiudadclasificacionDto } from './dto/create-ciudadclasificacion.dto';
import { UpdateCiudadclasificacionDto } from './dto/update-ciudadclasificacion.dto';

@Injectable()
export class CiudadclasificacionService {
  create(createCiudadclasificacionDto: CreateCiudadclasificacionDto) {
    return 'This action adds a new ciudadclasificacion';
  }

  findAll() {
    return `This action returns all ciudadclasificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ciudadclasificacion`;
  }

  update(id: number, updateCiudadclasificacionDto: UpdateCiudadclasificacionDto) {
    return `This action updates a #${id} ciudadclasificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciudadclasificacion`;
  }
}
