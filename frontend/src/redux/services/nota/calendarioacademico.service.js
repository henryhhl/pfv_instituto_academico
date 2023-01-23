
import apiServices from "../../../utils/apiservices";
import { dateToString, hourToString, httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAll = async ( {
    fkidunidadadministrativa = null, fkidgestionperiodo = null,
} ) => {
    return await httpRequest('get', apiServices.apinotacalendarioacademico_index, {
        fkidunidadadministrativa, fkidgestionperiodo,
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
    return await httpRequest('post', apiServices.apinotacalendarioacademico_store, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidgestionperiodo: body.fkidgestionperiodo,
        nota: body.nota,
        fechanota: body.fechanota,
        tipoactividad: body.tipoactividad,
        tipoferiado: body.tipoferiado,
        existeclases: body.existeclases,
        estado: body.estado,
        x_fecha: dateToString(),
        x_hora:  hourToString(),
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

const onShow = async (idcalendarioacademico) => {
    return await httpRequest('get', apiServices.apinotacalendarioacademico_show + `/${idcalendarioacademico}`, {
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

const onEdit = async (idcalendarioacademico) => {
    return await httpRequest('get', apiServices.apinotacalendarioacademico_edit + `/${idcalendarioacademico}`, {
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
    return await httpRequest('put', apiServices.apinotacalendarioacademico_update + `/${body.idcalendarioacademico}`, {
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        fkidgestionperiodo: body.fkidgestionperiodo,
        nota: body.nota,
        fechanota: body.fechanota,
        tipoactividad: body.tipoactividad,
        tipoferiado: body.tipoferiado,
        existeclases: body.existeclases,
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

const onDelete = async (idcalendarioacademico) => {
    return await httpRequest('delete', apiServices.apinotacalendarioacademico_delete + `/${idcalendarioacademico}`, {
        x_fecha: dateToString(),
        x_hora:  hourToString(),
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

export const CalendarioAcademicoService = {
    getAll,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
