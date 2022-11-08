
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllMateria = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiadminmateria_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            // toastr.success( respta.message, '', { closeButton: true, progressBar: true, positionClass: "toast-bottom-right", } );
        }
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminmateria_store, {
        fkidtipomateria: body.fkidtipomateria,
        tipomateria: body.tipomateria,
        codigo: body.codigo,
        sigla: body.sigla,
        nombrelargo: body.nombrelargo,
        nombrecorto: body.nombrecorto,
        nombrealternativo: body.nombrealternativo,
        creditos: body.creditos,
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

const onShow = async (idmateria) => {
    return await httpRequest('get', apiServices.apiadminmateria_show + `/${idmateria}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
        }
        return respta;
    } );
};

const onEdit = async (idmateria) => {
    return await httpRequest('get', apiServices.apiadminmateria_edit + `/${idmateria}`, {
    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            toastr.success( respta.message, '', { closeButton: true, progressBar: true, } );
        }
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminmateria_update + `/${body.idmateria}`, {
        fkidtipomateria: body.fkidtipomateria,
        tipomateria: body.tipomateria,
        codigo: body.codigo,
        sigla: body.sigla,
        nombrelargo: body.nombrelargo,
        nombrecorto: body.nombrecorto,
        nombrealternativo: body.nombrealternativo,
        creditos: body.creditos,
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
    return await httpRequest('delete', apiServices.apiadminmateria_delete + `/${body.idmateria}`, {
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

export const MateriaService = {
    getAllMateria,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
