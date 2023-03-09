
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllStudentSignedUp = async ( asistenciaGrupo ) => {
    return await httpRequest( 'get', apiServices.apiinscripciongrupo_findestudianteformateria, {
        fkidunidadnegocio: asistenciaGrupo.fkidunidadnegocio,
        fkidunidadadministrativa: asistenciaGrupo.fkidunidadadministrativa,
        fkidunidadacademica: asistenciaGrupo.fkidunidadacademica,
        fkidpensum: asistenciaGrupo.fkidpensum,
        fkidgrupo: asistenciaGrupo.fkidgrupo,
        fkidmateria: asistenciaGrupo.fkidmateria,
        fkidgestionperiodo: asistenciaGrupo.fkidgestionperiodo,
        fkidprograma: asistenciaGrupo.fkidprograma,
        fkiddocente: asistenciaGrupo.fkiddocente,
        monthselected: asistenciaGrupo.monthselected,
        yearselected: asistenciaGrupo.yearselected,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
        } else if ( respta.error === true && respta.resp === -2 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Usuario no Autorizado',
                text: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        }
        return respta;
    } );
};

const getAllMateriaForGrupo = async ( {
    fkiddocente = null,
} ) => {
    return await httpRequest( 'get', apiServices.apiofertaacademicagrupo_findmateriafordocente, {
        fkiddocente: fkiddocente,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
        } else if ( respta.error === true && respta.resp === -2 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Usuario no Autorizado',
                text: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        }
        return respta;
    } );
};

const onUpdate = async (asistenciaGrupo) => {
    return await httpRequest( 'put', apiServices.apinotaasistenciagrupo_update, {
        arrayAsistencia: asistenciaGrupo.arrayAsistenciaEstudianteSelected.map( (item) => {
            return { idasistenciagrupo: item.idasistenciagrupo, asistencia: item.asistencia, };
        } ),
    } ) .then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        } else if ( respta.error === true && respta.resp === -2 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Usuario no Autorizado',
                text: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        }
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest( 'delete', apiServices.apiseguridadasignarrol_delete + `/${body.idasignarrol}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        } else if ( respta.error === true && respta.resp === -2 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Usuario no Autorizado',
                text: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        }
        return respta;
    } );
};

export const AsistenciaGrupoService = {
    getAllMateriaForGrupo,
    getAllStudentSignedUp,
    onUpdate,
    onDelete,
};
