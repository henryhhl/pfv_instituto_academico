
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllTipoRol = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_index, {
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
    return await httpRequest('post', apiServices.apiseguridadtiporol_store, {
        descripcion: body.descripcion,
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

const onShow = async (idtiporol) => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_show + `/${idtiporol}`, {
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

const onEdit = async (idtiporol) => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_edit + `/${idtiporol}`, {
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
    return await httpRequest('put', apiServices.apiseguridadtiporol_update + `/${body.idtiporol}`, {
        descripcion: body.descripcion,
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
    return await httpRequest('delete', apiServices.apiseguridadtiporol_delete + `/${body.idtiporol}`, {
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

export const TipoRolService = {
    getAllTipoRol,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
