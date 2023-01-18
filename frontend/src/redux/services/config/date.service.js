import Swal from 'sweetalert2';
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllFindDays = async ( {
} ) => {
    return await httpRequest('get', apiServices.apidate_findAllDays, {
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

export const DateService = {
    getAllFindDays,
};
