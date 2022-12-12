
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllActividad = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apioportunidadactividad_index, {
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

const onCreate = async (fkidnegocio) => {
    return await httpRequest('get', apiServices.apioportunidadactividad_create, {
        fkidnegocio: fkidnegocio,
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

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apioportunidadactividad_store, {
        fkidtipoactividad: body.fkidtipoactividad,
        tipoactividad: body.tipoactividad,

        fkidtiporesultado: body.fkidtiporesultado,
        tiporesultado: body.tiporesultado,

        fkidasesorresponsable: body.fkidasesorresponsable,
        asesorresponsable: body.asesorresponsable,

        fkidnegocio: body.fkidnegocio,

        nroactividad: body.nroactividad,
        descripcion: body.descripcion,
        fechaprogramada: body.fechaprogramada,
        horaprogramada: body.horaprogramada,

        nota: body.nota,
        fechacierre: body.fechacierre,
        resultado: body.resultado,

    } ).then( (respta) => {
        if ( respta.resp === 1 && respta.error === false ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'success',
                title: respta.message,
                showConfirmButton: false,
                timer: 3000,
            } );
        } else if ( respta.resp === 0 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'No se pudo registrar.',
                text: respta.message,
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

const onShow = async (idactividad) => {
    return await httpRequest('get', apiServices.apioportunidadactividad_show + `/${idactividad}`, {
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

const onEdit = async (idactividad) => {
    return await httpRequest('get', apiServices.apioportunidadactividad_edit + `/${idactividad}`, {
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
    return await httpRequest('put', apiServices.apioportunidadactividad_update + `/${body.idactividad}`, {
        fkidtipoactividad: body.fkidtipoactividad,
        tipoactividad: body.tipoactividad,

        fkidtiporesultado: body.fkidtiporesultado,
        tiporesultado: body.tiporesultado,

        fkidasesorresponsable: body.fkidasesorresponsable,
        asesorresponsable: body.asesorresponsable,

        fkidnegocio: body.fkidnegocio,

        nroactividad: body.nroactividad,
        descripcion: body.descripcion,
        fechaprogramada: body.fechaprogramada,
        horaprogramada: body.horaprogramada,

        nota: body.nota,
        fechacierre: body.fechacierre,
        resultado: body.resultado,

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
        } else if ( respta.resp === 0 ) {
            Swal.fire( {
                position: 'top-end',
                icon: 'warning',
                title: 'No se pudo actualizar.',
                text: respta.message,
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
    return await httpRequest('delete', apiServices.apioportunidadactividad_delete + `/${body.idactividad}`, {
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

export const ActividadService = {
    getAllActividad,
    onCreate,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
