import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TipoPermiso } from './interfaces/tipoPermiso.interface';
import { CreateTipoPermisoDto, UpdateTipoPermisoDto } from './dto';

@Injectable()
export class TipoPermisoService {
    private listTipoPermiso: TipoPermiso[] = [];

    getAll() {
        return this.listTipoPermiso;
    }

    findTipoPermisoById( idtipopermiso:string ) {
        const tipoPermiso = this.listTipoPermiso.find( tipoPermiso => tipoPermiso.idtipopermiso === idtipopermiso );
        // if (!tipoPermiso) {
        //     throw new NotFoundException('Eror al realizar servicio.');
        // }
        return tipoPermiso;
    }

    editTipoPermiso( idtipopermiso: string ) {
        const tipoPermiso = this.listTipoPermiso.find( tipoPermiso => tipoPermiso.idtipopermiso === idtipopermiso );
        // if (!tipoPermiso) {
        //     throw new NotFoundException('Eror al realizar servicio.');
        // }
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
    }

    showTipoPermiso( idtipopermiso: string ) {
        const tipoPermiso = this.listTipoPermiso.find( tipoPermiso => tipoPermiso.idtipopermiso === idtipopermiso );
        // if (!tipoPermiso) {
        //     throw new NotFoundException('Eror al realizar servicio.');
        // }
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
    }

    storeTipoPermiso( request : CreateTipoPermisoDto ) {
        const tipoPermiso: TipoPermiso = {
            idtipopermiso: uuid(),
            descripcion: request.descripcion,
            estado: 'A',
            concurrencia: 1,
            isdelete: 'A',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        };
        this.listTipoPermiso.push(tipoPermiso);
        return {
            resp: 1,
            error: false,
            message: 'Tipo Permiso registrado éxitosamente.',
            tipoPermiso: tipoPermiso,
        };
    }

    updateTipoPermiso( idtipopermiso: string, request : UpdateTipoPermisoDto ) {
        let tipoPermisoById = this.findTipoPermisoById(idtipopermiso);
        if ( tipoPermisoById === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        }
        
        this.listTipoPermiso = this.listTipoPermiso.map( ( tipoPermiso ) => {
            if ( tipoPermiso.idtipopermiso === idtipopermiso ) {
                tipoPermisoById = {
                    ...tipoPermisoById,
                    ...request,
                    idtipopermiso,
                    concurrencia: tipoPermiso.concurrencia + 1,
                };
                return tipoPermisoById;
            }
            return tipoPermiso;
        } );
        return {
            resp: 1, error: false,
            message: 'Tipo Permiso actualizado éxitosamente.',
            tipoPermiso: tipoPermisoById,
        };
    }

    deleteTipoPermiso( idtipopermiso: string ) {
        let tipoPermisoById = this.findTipoPermisoById(idtipopermiso);
        if ( tipoPermisoById === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Permiso no existe.',
            };
        }
        this.listTipoPermiso = this.listTipoPermiso.filter( ( tipoPermiso ) => tipoPermiso.idtipopermiso !== idtipopermiso );
        return {
            resp: 1, error: false,
            message: 'Tipo Permiso eliminado éxitosamente.',
            tipoPermiso: tipoPermisoById,
        };
    }

    fillTipoPermisoSeedData( listTipoPermiso: TipoPermiso[] ) {
        this.listTipoPermiso = listTipoPermiso;
    }

}
