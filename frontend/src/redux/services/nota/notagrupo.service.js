
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';

const getAllStudentSignedUp = async ( notaGrupo ) => {
    return await httpRequest( 'get', apiServices.apiinscripciongrupo_findestudianteforparametrocalificacion + `/${notaGrupo.fkidgrupopensumdetalle}`, {

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

const onUpdate = async (arrayNotaGrupoEstudiante) => {
    return await httpRequest( 'put', apiServices.apinotanotagrupo_update, {
        arrayNotaGrupo: arrayNotaGrupoEstudiante,
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

export const NotaGrupoService = {
    getAllMateriaForGrupo,
    getAllStudentSignedUp,
    onUpdate,
};
