
import toastr from 'toastr';
import Swal from 'sweetalert2';
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAll = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiseguridadbitacora_index, {
        search: search,
        offset: page - 1,
        limit: paginate,
        esPaginate: esPaginate,
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

const onShow = async (idbitacora) => {
    return await httpRequest('get', apiServices.apiseguridadbitacora_show + `/${idbitacora}`, {
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

export const BitacoraService = {
    getAll,
    onShow,
};
