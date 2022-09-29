import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TipoRol } from './interfaces/tipoRol.interface';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';

@Injectable()
export class TipoRolService {
    private listTipoRol: TipoRol[] = [];

    getAll() {
        return this.listTipoRol;
    }

    findTipoRolById( idtiporol:string ) {
        const tipoRol = this.listTipoRol.find( tipoRol => tipoRol.idtiporol === idtiporol );
        if (!tipoRol) {
            throw new NotFoundException('Eror al realizar servicio.');
        }
        return tipoRol;
    }

    storeTipoRol( request : CreateTipoRolDto ) {
        const tipoRol: TipoRol = {
            idtiporol: uuid(),
            descripcion: request.descripcion,
            estado: 'A',
            concurrencia: 1,
            isdelete: 'A',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        };
        this.listTipoRol.push(tipoRol);
        return tipoRol;
    }

    updateTipoRol( idtiporol: string, request : UpdateTipoRolDto ) {
        let tipoRolById = this.findTipoRolById(idtiporol);
        this.listTipoRol = this.listTipoRol.map( ( tipoRol ) => {
            if ( tipoRol.idtiporol === idtiporol ) {
                tipoRolById = {
                    ...tipoRolById,
                    ...request,
                    idtiporol,
                };
                return tipoRolById;
            }
            return tipoRol;
        } );
        return tipoRolById;
    }

    deleteTipoRol( idtiporol: string ) {
        let tipoRolById = this.findTipoRolById(idtiporol);
        this.listTipoRol = this.listTipoRol.filter( tiporol => tiporol.idtiporol !== idtiporol );
    }

    fillTipoRolSeedData( listTipoRol: TipoRol[] ) {
        this.listTipoRol = listTipoRol;
    }

}
