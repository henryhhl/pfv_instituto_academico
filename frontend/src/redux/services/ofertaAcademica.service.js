
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllOfertaAcademica = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, positionClass: "toast-bottom-right", } );
        }
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminofertaacademica_store, {
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
        }
        return respta;
    } );
};

const onShow = async (idofertaacademica) => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_show + `/${idofertaacademica}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
        }
        return respta;
    } );
};

const onEdit = async (idofertaacademica) => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_edit + `/${idofertaacademica}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
        }
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminofertaacademica_update + `/${body.idofertaacademica}`, {
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
        }
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminofertaacademica_delete + `/${body.idofertaacademica}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        }
        return respta;
    } );
};

export const OfertaAcademicaService = {
    getAllOfertaAcademica,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
