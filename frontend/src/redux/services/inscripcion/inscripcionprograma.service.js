
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllInscripcionPrograma = async ( {
    page = 1, paginate = 1, 
    fkidprograma = "", fkidgestionperiodo = "",
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcionprograma_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
        fkidprograma: fkidprograma,
        fkidgestionperiodo: fkidgestionperiodo,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            // toastr.success( respta.message, '', { closeButton: true, progressBar: true, positionClass: "toast-bottom-right", } );
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

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiinscripcioninscripcionprograma_store, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidprograma: body.fkidprograma,
        fkidpensum: body.fkidpensum,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidestudiante: body.fkidestudiante,
        fechainscripcion: body.fechainscripcion,
        esinscripcionformalizada: body.esinscripcionformalizada,
        nota: body.nota,
        estado: body.estado,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        } else if ( respta.resp === 0 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'Funcionalidad interrumpida.',
                text: respta.message,
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

const onShow = async (idinscripcionprograma) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcionprograma_show + `/${idinscripcionprograma}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
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

const onEdit = async (idinscripcionprograma) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcionprograma_edit + `/${idinscripcionprograma}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
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

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiinscripcioninscripcionprograma_update + `/${body.idinscripcionprograma}`, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidprograma: body.fkidprograma,
        fkidpensum: body.fkidpensum,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidestudiante: body.fkidestudiante,
        fechainscripcion: body.fechainscripcion,
        esinscripcionformalizada: body.esinscripcionformalizada,
        nota: body.nota,
        estado: body.estado,
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

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiinscripcioninscripcionprograma_delete + `/${body.idinscripcionprograma}`, {
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

export const InscripcionProgramaService = {
    getAllInscripcionPrograma,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
