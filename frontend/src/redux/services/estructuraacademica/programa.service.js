
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllPrograma = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
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
    return await httpRequest('post', apiServices.apiestructuraacademicaprograma_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidnivelacademico: body.fkidnivelacademico,
        nivelacademico: body.nivelacademico,
        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
        arraydivisionacademica: body.arraymallacurricular,
    } ).then( (respta) => {
        console.log(respta)
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

const onShow = async (idprograma) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_show + `/${idprograma}`, {
    } ).then( (respta) => {
        console.log(respta)
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

const onEdit = async (idprograma) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_edit + `/${idprograma}`, {
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
    return await httpRequest('put', apiServices.apiestructuraacademicaprograma_update + `/${body.idprograma}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidnivelacademico: body.fkidnivelacademico,
        nivelacademico: body.nivelacademico,
        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
        arraydivisionacademica: body.arraymallacurricular,
    } ).then( (respta) => {
        console.log(respta)
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
    return await httpRequest('delete', apiServices.apiestructuraacademicaprograma_delete + `/${body.idprograma}`, {
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

export const ProgramaService = {
    getAllPrograma,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
