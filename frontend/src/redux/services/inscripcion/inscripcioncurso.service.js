
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllInscripcionCurso = async ( {
    page = 1, paginate = 1, 
    fkidcurso = "",
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcioncurso_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
        fkidcurso: fkidcurso,
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
    return await httpRequest('post', apiServices.apiinscripcioninscripcioncurso_store, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidcurso: body.fkidcurso,
        fkidturno: body.fkidturno,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidestudiante: body.fkidestudiante,
        fkidmodalidadacademica: body.fkidmodalidadacademica,
        fechainscripcion: body.fechainscripcion,
        esinscripcionformalizada: body.esinscripcionformalizada,
        condicion: body.condicion,
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

const onShow = async (idinscripcioncurso) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcioncurso_show + `/${idinscripcioncurso}`, {
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

const onEdit = async (idinscripcioncurso) => {
    return await httpRequest('get', apiServices.apiinscripcioninscripcioncurso_edit + `/${idinscripcioncurso}`, {
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
    return await httpRequest('put', apiServices.apiinscripcioninscripcioncurso_update + `/${body.idinscripcioncurso}`, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        fkidcurso: body.fkidcurso,
        fkidturno: body.fkidturno,
        fkidgestionperiodo: body.fkidgestionperiodo,
        fkidestudiante: body.fkidestudiante,
        fechainscripcion: body.fechainscripcion,
        esinscripcionformalizada: body.esinscripcionformalizada,
        condicion: body.condicion,
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
    return await httpRequest('delete', apiServices.apiinscripcioninscripcioncurso_delete + `/${body.idinscripcioncurso}`, {
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

export const InscripcionCursoService = {
    getAllInscripcionCurso,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
