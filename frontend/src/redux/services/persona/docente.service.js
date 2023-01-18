
import apiServices from "../../../utils/apiservices";
import { dateToString, hourToString, httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllDocente = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apipersonadocente_index, {
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
    return await httpRequest('post', apiServices.apipersonadocente_store, {
        fkidtipoidentificacion: body.fkidtipoidentificacion,
        tipoidentificacion: body.tipoidentificacion,

        fkidciudadnacimiento: body.fkidciudadnacimiento,
        ciudadnacimiento: body.ciudadnacimiento,

        fkidciudadresidencia: body.fkidciudadresidencia,
        ciudadresidencia: body.ciudadresidencia,

        arrayreferenciacontactos: body.arrayreferenciacontactos,
        arraynacionalidad: body.arraynacionalidad,
        arraymateria: body.arraymateria,
        arraycategoriadocumento: body.arraycategoriadocumento,
        arrayestudio: body.arrayestudio,

        nombreprincipal: body.nombreprincipal,
        nombreadicional: body.nombreadicional,

        apellidoprimero: body.apellidoprimero,
        apellidosegundo: body.apellidosegundo,

        numeroidentificacion: body.numeroidentificacion,
        genero: body.genero,
        email: body.email,
        telefono: body.telefono,
        celular: body.celular,
        fechanacimiento: body.fechanacimiento,
        direccion: body.direccion,
        uv: body.uv,
        manzano: body.manzano,
        barrio: body.barrio,
        estadocivil: body.estadocivil,
        imagen: body.imagen,

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

const onShow = async (iddocente) => {
    return await httpRequest('get', apiServices.apipersonadocente_show + `/${iddocente}`, {
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

const onEdit = async (iddocente) => {
    return await httpRequest('get', apiServices.apipersonadocente_edit + `/${iddocente}`, {
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
    return await httpRequest('put', apiServices.apipersonadocente_update + `/${body.iddocente}`, {
        fkidtipoidentificacion: body.fkidtipoidentificacion,
        tipoidentificacion: body.tipoidentificacion,

        fkidciudadnacimiento: body.fkidciudadnacimiento,
        ciudadnacimiento: body.ciudadnacimiento,

        fkidciudadresidencia: body.fkidciudadresidencia,
        ciudadresidencia: body.ciudadresidencia,

        arrayreferenciacontactos: body.arrayreferenciacontactos,
        arraynacionalidad: body.arraynacionalidad,
        arraymateria: body.arraymateria,
        arraycategoriadocumento: body.arraycategoriadocumento,
        arrayestudio: body.arrayestudio,

        nombreprincipal: body.nombreprincipal,
        nombreadicional: body.nombreadicional,

        apellidoprimero: body.apellidoprimero,
        apellidosegundo: body.apellidosegundo,

        numeroidentificacion: body.numeroidentificacion,
        genero: body.genero,
        email: body.email,
        telefono: body.telefono,
        celular: body.celular,
        fechanacimiento: body.fechanacimiento,
        direccion: body.direccion,
        uv: body.uv,
        manzano: body.manzano,
        barrio: body.barrio,
        estadocivil: body.estadocivil,
        imagen: body.imagen,
        
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
    return await httpRequest('delete', apiServices.apipersonadocente_delete + `/${body.iddocente}`, {
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

export const DocenteService = {
    getAllDocente,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
