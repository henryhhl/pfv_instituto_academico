import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { TipoRol } from './entities/tipoRol.entity';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TipoRolService {
    private readonly logger = new Logger('TipoRolService');

    constructor(
        @InjectRepository(TipoRol)
        private readonly tipoRolRepository: Repository<TipoRol>,
    ) {}

    async findAll( paginationDto: PaginationDto ) {
        try {
            const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
            let listTipoRol = [];
            let totalPagination = 0;
            if ( esPaginate ) {
                [listTipoRol, totalPagination] = await this.tipoRolRepository.findAndCount( {
                    take: limit, skip: offset,
                    where: [
                        { descripcion: ILike( '%' + search + '%', ), },
                    ],
                    order: { created_at: "DESC", },
                } );
            } else {
                [listTipoRol, totalPagination] = await this.tipoRolRepository.findAndCount( {
                    where: [
                        { descripcion: ILike( '%' + search + '%', ), },
                    ],
                    order: { created_at: "DESC", },
                } );
            }
            return {
                resp: 1, error: false,
                message: 'Servicio realizado exitosamente.',
                arrayTipoRol: listTipoRol,
                pagination: {
                    total: totalPagination,
                },
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
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

    async store(createTipoRolDto: CreateTipoRolDto) {
        try {
            const tipoRol = this.tipoRolRepository.create( {
                descripcion: createTipoRolDto.descripcion,
                created_at: this.getDateTime(),
            } );
            await this.tipoRolRepository.save( tipoRol );
            return {
                resp: 1, error: false,
                message: 'Tipo Rol registrado éxitosamente.',
                tipoRol: tipoRol,
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al insertar información con el servidor.',
            };
        }
    }

    async findOne(idtiporol: string) {
        try {
            const tipoRol = await this.tipoRolRepository.findOneBy( {
                idtiporol: idtiporol,
            } );
            return tipoRol;
        } catch (error) {
            return null;
        }
    }

    async edit( idtiporol: string ) {
        try {
            const tipoRol = await this.findOne(idtiporol);
            if ( tipoRol ) {
                return {
                    resp: 1, error: false,
                    message: 'Servicio realizado exitosamente.',
                    tipoRol: tipoRol,
                };
            }
            return {
                resp: 0, error: false,
                message: 'Tipo Rol no existe.',
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
    }

    async show( idtiporol: string ) {
        try {
            const tipoRol = await this.findOne(idtiporol);
            if ( tipoRol ) {
                return {
                    resp: 1, error: false,
                    message: 'Servicio realizado exitosamente.',
                    tipoRol: tipoRol,
                };
            }
            return {
                resp: 0, error: false,
                message: 'Tipo Rol no existe.',
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
    }

    async update( idtiporol: string, updateTipoRolDto: UpdateTipoRolDto ) {
        const tipoRol = await this.findOne(idtiporol);
        if ( tipoRol === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Rol no existe.',
            };
        }
        const tipoRolPreLoad = await this.tipoRolRepository.preload( {
            idtiporol: idtiporol,
            ...updateTipoRolDto,
            concurrencia: tipoRol.concurrencia + 1,
            updated_at: this.getDateTime(),
        } );

        if ( tipoRolPreLoad === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Rol no existe.',
            };
        }
        const tipoRolUpdate = await this.tipoRolRepository.save( tipoRolPreLoad );
        return {
            resp: 1,
            error: false,
            message: 'Tipo Rol actualizado éxitosamente.',
            tipoRol: tipoRol,
            tipoRolUpdate: tipoRolUpdate,
        };
    }

    async delete( idtiporol: string ) {
        try {
            let tipoRol = await this.findOne(idtiporol);
            if ( tipoRol === null ) {
                return {
                    resp: 0, error: true,
                    message: 'Tipo Rol no existe.',
                };
            }
            await this.tipoRolRepository.remove( tipoRol );
            return {
                resp: 1, error: false,
                message: 'Tipo Rol eliminado éxitosamente.',
                tipoRol: tipoRol,
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
    }

}
