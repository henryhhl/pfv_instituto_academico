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
        if (!tipoPermiso) {
            throw new NotFoundException('Eror al realizar servicio.');
        }
        return tipoPermiso;
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
        return tipoPermiso;
    }

    updateTipoPermiso( idtipopermiso: string, request : UpdateTipoPermisoDto ) {
        let tipoPermisoById = this.findTipoPermisoById(idtipopermiso);
        this.listTipoPermiso = this.listTipoPermiso.map( ( tipoPermiso ) => {
            if ( tipoPermiso.idtipopermiso === idtipopermiso ) {
                tipoPermisoById = {
                    ...tipoPermisoById,
                    ...request,
                    idtipopermiso,
                };
                return tipoPermisoById;
            }
            return tipoPermiso;
        } );
        return tipoPermisoById;
    }

    deleteTipoPermiso( idtipopermiso: string ) {
        let tipoPermisoById = this.findTipoPermisoById(idtipopermiso);
        this.listTipoPermiso = this.listTipoPermiso.filter( ( tipoPermiso ) => tipoPermiso.idtipopermiso !== idtipopermiso );
    }

    fillTipoPermisoSeedData( listTipoPermiso: TipoPermiso[] ) {
        this.listTipoPermiso = listTipoPermiso;
    }

}
