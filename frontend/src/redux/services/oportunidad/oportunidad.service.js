
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllOportunidad = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apioportunidadoportunidad_index, {
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
    return await httpRequest('post', apiServices.apioportunidadoportunidad_store, {
        arraytipocontacto: body.arraytipocontacto?.filter( ( item ) => ( item.fkidtipocontacto !== null ) ).map( 
            ( { error, message, ...item } ) => {
                return item;
            }
        ),
        arraytipomediopublicitario: body.arraytipomediopublicitario?.filter( ( item ) => ( item.fkidtipomediopublicitario !== null ) ).map( 
            ( { error, message, ...item } ) => {
                return item;
            }
        ),

        fkidciudadorigen: body.fkidciudadorigen,
        ciudadorigen: body.ciudadorigen,

        fkidasesorresponsable: body.fkidasesorresponsable,
        asesorresponsable: body.asesorresponsable,

        identificacion: body.identificacion,
        descripcion: body.descripcion,

        celular: body.celular,
        email: body.email,
        direccion: body.direccion,
        barrio: body.barrio,
        fecharegistro: body.fecharegistro,
        horaregistro: body.horaregistro,
        nota: body.nota,

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

const onShow = async (idoportunidad) => {
    return await httpRequest('get', apiServices.apioportunidadoportunidad_show + `/${idoportunidad}`, {
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

const onEdit = async (idoportunidad) => {
    return await httpRequest('get', apiServices.apioportunidadoportunidad_edit + `/${idoportunidad}`, {
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
    return await httpRequest('put', apiServices.apioportunidadoportunidad_update + `/${body.idoportunidad}`, {
        arraytipocontacto: body.arraytipocontacto?.filter( ( item ) => ( item.fkidtipocontacto !== null ) ).map( 
            ( { error, message, ...item } ) => {
                return item;
            }
        ),
        arraytipomediopublicitario: body.arraytipomediopublicitario?.filter( ( item ) => ( item.fkidtipomediopublicitario !== null ) ).map( 
            ( { error, message, ...item } ) => {
                return item;
            }
        ),

        fkidciudadorigen: body.fkidciudadorigen,
        ciudadorigen: body.ciudadorigen,

        fkidasesorresponsable: body.fkidasesorresponsable,
        asesorresponsable: body.asesorresponsable,

        identificacion: body.identificacion,
        descripcion: body.descripcion,

        celular: body.celular,
        email: body.email,
        direccion: body.direccion,
        barrio: body.barrio,
        fecharegistro: body.fecharegistro,
        horaregistro: body.horaregistro,
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
    return await httpRequest('delete', apiServices.apioportunidadoportunidad_delete + `/${body.idoportunidad}`, {
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
                icon: 'error',
                title: 'Eliminar Oportunidad no procesada.',
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

export const OportunidadService = {
    getAllOportunidad,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
