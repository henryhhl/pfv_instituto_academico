
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllInscripcionGrupo = async ( {
    page = 1, paginate = 1, 
    fkidgrupo = "", fkidmateria = "", fkidgestionperiodo = "",
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripciongrupo_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
        fkidgrupo: fkidgrupo,
        fkidmateria: fkidmateria,
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
    return await httpRequest('post', apiServices.apiinscripcioninscripciongrupo_store, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidestudiante: body.fkidestudiante,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidprograma: body.fkidprograma,
        fkidpensum: body.fkidpensum,
        fkidmateria: body.fkidmateria,
        fkidgrupo: body.fkidgrupo,
        fkiddocente: body.fkiddocente,
        fkidgrupopensumdetalle: body.fkidgrupopensumdetalle,
        fechainscripcion: body.fechainscripcion,
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

const onShow = async (idinscripciongrupo) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripciongrupo_show + `/${idinscripciongrupo}`, {
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

const onEdit = async (idinscripciongrupo) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripciongrupo_edit + `/${idinscripciongrupo}`, {
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
    return await httpRequest('put', apiServices.apiinscripcioninscripciongrupo_update + `/${body.idinscripciongrupo}`, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidestudiante: body.fkidestudiante,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidprograma: body.fkidprograma,
        fkidpensum: body.fkidpensum,
        fkidmateria: body.fkidmateria,
        fkidgrupo: body.fkidgrupo,
        fechainscripcion: body.fechainscripcion,
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
    return await httpRequest('delete', apiServices.apiinscripcioninscripciongrupo_delete + `/${body.idinscripciongrupo}`, {
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

export const InscripcionGrupoService = {
    getAllInscripcionGrupo,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
