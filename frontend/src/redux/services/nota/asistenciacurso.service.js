import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';

const getAllMateriaForDocente = async ( {
    fkiddocente = null,
} ) => {
    return await httpRequest( 'get', apiServices.apiofertaacademicacurso_findmateriafordocente, {
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

const getAllStudentSignedUp = async ( asistenciaCurso ) => {
    return await httpRequest( 'get', apiServices.apiinscripcioninscripcioncurso_findestudianteforcurso, {
        fkidcurso: asistenciaCurso.fkidcurso,
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

const onUpdate = async (asistenciaCurso) => {
    return await httpRequest( 'put', apiServices.apinotaasistenciacurso_update, {
        arrayAsistencia: asistenciaCurso.arrayAsistenciaEstudianteSelected.map( (item) => {
            return { idasistenciacurso: item.idasistenciacurso, asistencia: item.asistencia, };
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

export const AsistenciaCursoService = {
    getAllMateriaForDocente,
    getAllStudentSignedUp,
    onUpdate,
};
