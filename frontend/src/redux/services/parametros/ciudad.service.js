
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllCiudad = async (search = "") => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_index, {
        search: search,
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

const onCreate = async (search = "") => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_create, {
        search: search,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, positionClass: "toast-bottom-right", } );
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
    return await httpRequest('post', apiServices.apiparametrosadminciudad_store, {
        fkidtipociudad: body.fkidtipociudad,
        tipociudad: body.tipociudad,
        fkidciudadpadre: body.fkidciudadpadre,
        sigla: body.sigla,
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

const onShow = async (idciudad) => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_show + `/${idciudad}`, {
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

const onEdit = async (idciudad) => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_edit + `/${idciudad}`, {
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
    return await httpRequest('put', apiServices.apiparametrosadminciudad_update + `/${body.idciudad}`, {
        fkidtipociudad: body.fkidtipociudad,
        tipociudad: body.tipociudad,
        fkidciudadpadre: body.fkidciudadpadre,
        sigla: body.sigla,
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
    return await httpRequest('delete', apiServices.apiparametrosadminciudad_delete + `/${body.idciudad}`, {
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

export const CiudadService = {
    getAllCiudad,
    onCreate,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
