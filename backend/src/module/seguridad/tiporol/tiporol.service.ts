import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TipoRol } from './interfaces/tipoRol.interface';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';

@Injectable()
export class TipoRolService {
    private listTipoRol: TipoRol[] = [];

    getAll() {
        const listTipoRol = this.listTipoRol;
        return {
            resp: 1,
            error: false,
            message: 'Servicio realizado exitosamente.',
            arrayTipoRol: listTipoRol,
        };
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
        };
        this.listTipoRol.push(tipoRol);
        return {
            resp: 1,
            error: false,
            message: 'Tipo Rol registrado éxitosamente.',
            tipoRol: tipoRol,
        };
    }

    editTipoRol( idtiporol: string ) {
        const tipoRol = this.listTipoRol.find( tipoRol => tipoRol.idtiporol === idtiporol );
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
    }

    showTipoRol( idtiporol: string ) {
        const tipoRol = this.listTipoRol.find( tipoRol => tipoRol.idtiporol === idtiporol );
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
    }

    updateTipoRol( idtiporol: string, request : UpdateTipoRolDto ) {
        let tipoRolById = this.findTipoRolById(idtiporol);
        this.listTipoRol = this.listTipoRol.map( ( tipoRol ) => {
            if ( tipoRol.idtiporol === idtiporol ) {
                tipoRolById = {
                    ...tipoRolById,
                    ...request,
                    idtiporol,
                    concurrencia: tipoRol.concurrencia + 1,
                };
                return tipoRolById;
            }
            return tipoRol;
        } );
        return {
            resp: 1,
            error: false,
            message: 'Tipo Rol registrado éxitosamente.',
            tipoRol: tipoRolById,
        };
    }

    deleteTipoRol( idtiporol: string ) {
        let tipoRolById = this.findTipoRolById(idtiporol);
        if ( tipoRolById === null ) {
            return {
                resp: 0, error: false,
                message: 'Tipo Rol no existe.',
            };
        }
        this.listTipoRol = this.listTipoRol.filter( tiporol => tiporol.idtiporol !== idtiporol );
        return {
            resp: 1, error: false,
            message: 'Tipo Permiso eliminado éxitosamente.',
            tipoRol: tipoRolById,
        };
    }

    fillTipoRolSeedData( listTipoRol: TipoRol[] ) {
        this.listTipoRol = listTipoRol;
    }

}
