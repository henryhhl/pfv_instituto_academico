
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllPensum = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_index, {
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
    return await httpRequest('post', apiServices.apiestructuraacademicapensum_store, {
        arraydivisionacademica: body.arraydivisionacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidprograma: body.fkidprograma,
        programa: body.programa,
        descripcion: body.descripcion,
        fechaaprobacion: body.fechaaprobacion,
        nota: body.nota,
        estadoproceso: body.estadoproceso,
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

const onShow = async (idpensum) => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_show + `/${idpensum}`, {
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

const onEdit = async (idpensum) => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_edit + `/${idpensum}`, {
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

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicapensum_update + `/${body.idpensum}`, {
        arraydivisionacademica: body.arraydivisionacademica,
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidprograma: body.fkidprograma,
        programa: body.programa,
        descripcion: body.descripcion,
        fechaaprobacion: body.fechaaprobacion,
        estadoproceso: body.estadoproceso,
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
    return await httpRequest('delete', apiServices.apiestructuraacademicapensum_delete + `/${body.idpensum}`, {
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

export const PensumService = {
    getAllPensum,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
