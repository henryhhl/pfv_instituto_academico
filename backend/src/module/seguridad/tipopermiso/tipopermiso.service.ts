import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { TipoPermiso } from './entities/tipoPermiso.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateTipoPermisoDto, UpdateTipoPermisoDto } from './dto';

@Injectable()
export class TipoPermisoService {
    private readonly logger = new Logger('TipoPermisoService');

    constructor(
        @InjectRepository(TipoPermiso)
        private readonly tipoPermisoRepository: Repository<TipoPermiso>,
    ) {}

    async findAll( paginationDto: PaginationDto ) {
        try {
            const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
            let listTipoPermiso = [];
            let totalPagination = 0;
            if ( esPaginate ) {
                [listTipoPermiso, totalPagination] = await this.tipoPermisoRepository.findAndCount( {
                    take: limit, skip: offset,
                    where: [
                        { descripcion: ILike( '%' + search + '%', ), },
                    ],
                    order: { created_at: "DESC", },
                } );
            } else {
                [listTipoPermiso, totalPagination] = await this.tipoPermisoRepository.findAndCount( {
                    where: [
                        { descripcion: ILike( '%' + search + '%', ), },
                    ],
                    order: { created_at: "DESC", },
                } );
            }
            return {
                resp: 1, error: false,
                message: 'Servicio realizado exitosamente.',
                arrayTipoPermiso: listTipoPermiso,
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

    async store(createTipoPermisoDto: CreateTipoPermisoDto) {
        try {
            const tipoPermiso = this.tipoPermisoRepository.create( {
                descripcion: createTipoPermisoDto.descripcion,
                created_at: this.getDateTime(),
            } );
            await this.tipoPermisoRepository.save( tipoPermiso );
            return {
                resp: 1, error: false,
                message: 'Tipo Permiso registrado éxitosamente.',
                tipoPermiso: tipoPermiso,
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al insertar información con el servidor.',
            };
        }
    }

    async findOne(idtipopermiso: string) {
        try {
            const tipoPermiso = await this.tipoPermisoRepository.findOneBy( {
                idtipopermiso: idtipopermiso,
            } );
            return tipoPermiso;
        } catch (error) {
            return null;
        }
    }

    async edit( idtipopermiso: string ) {
        try {
            const tipoPermiso = await this.findOne(idtipopermiso);
            if ( tipoPermiso ) {
                return {
                    resp: 1, error: false,
                    message: 'Servicio realizado exitosamente.',
                    tipoPermiso: tipoPermiso,
                };
            }
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
    }

    async show( idtipopermiso: string ) {
        try {
            const tipoPermiso = await this.findOne(idtipopermiso);
            if ( tipoPermiso ) {
                return {
                    resp: 1, error: false,
                    message: 'Servicio realizado exitosamente.',
                    tipoPermiso: tipoPermiso,
                };
            }
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        } catch (error) {
            this.logger.error(error);
            return {
                resp: -1, error: true,
                message: 'Hubo conflictos al consultar información con el servidor.',
            };
        }
    }

    async update( idtipopermiso: string, updateTipoPermisoDto: UpdateTipoPermisoDto ) {
        const tipoPermiso = await this.findOne(idtipopermiso);
        if ( tipoPermiso === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        }
        const tipoPermisoPreLoad = await this.tipoPermisoRepository.preload( {
            idtipopermiso: idtipopermiso,
            ...updateTipoPermisoDto,
            concurrencia: tipoPermiso.concurrencia + 1,
            updated_at: this.getDateTime(),
        } );

        if ( tipoPermisoPreLoad === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        }
        const tipoPermisoUpdate = await this.tipoPermisoRepository.save( tipoPermisoPreLoad );
        return {
            resp: 1,
            error: false,
            message: 'Tipo Permiso actualizado éxitosamente.',
            tipoPermiso: tipoPermiso,
            tipoPermisoUpdate: tipoPermisoUpdate,
        };
    }

    async delete( idtipopermiso: string ) {
        try {
            let tipoPermiso = await this.findOne(idtipopermiso);
            if ( tipoPermiso === null ) {
                return {
                    resp: 0, error: true,
                    message: 'Tipo Permiso no existe.',
                };
            }
            await this.tipoPermisoRepository.remove( tipoPermiso );
            return {
                resp: 1, error: false,
                message: 'Tipo Permiso eliminado éxitosamente.',
                tipoPermiso: tipoPermiso,
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
