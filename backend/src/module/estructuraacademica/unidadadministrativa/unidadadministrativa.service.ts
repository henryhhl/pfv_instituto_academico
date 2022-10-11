import { Injectable } from '@nestjs/common';
import { CreateUnidadadministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadadministrativaDto } from './dto/update-unidadadministrativa.dto';

@Injectable()
export class UnidadadministrativaService {
  create(createUnidadadministrativaDto: CreateUnidadadministrativaDto) {
    return 'This action adds a new unidadadministrativa';
  }

  findAll() {
    return `This action returns all unidadadministrativa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidadadministrativa`;
  }

  update(id: number, updateUnidadadministrativaDto: UpdateUnidadadministrativaDto) {
    return `This action updates a #${id} unidadadministrativa`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidadadministrativa`;
  }
}
