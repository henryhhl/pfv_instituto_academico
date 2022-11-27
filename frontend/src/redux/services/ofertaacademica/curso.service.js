
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";
import Swal from 'sweetalert2';
import toastr from 'toastr';

const getAllCurso = async ( {
    page = 1, paginate = 1, 
    search = "", esPaginate = false,
} ) => {
    return await httpRequest('get', apiServices.apiofertaacademicacurso_index, {
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
    return await httpRequest('post', apiServices.apiofertaacademicacurso_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,

        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,

        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,

        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,

        fkidturno: body.fkidturno,
        turno: body.turno,

        fkidmateria: body.fkidmateria,
        materia: body.materia,

        fkidgestionperiodo: body.fkidgestionperiodo,
        gestionperiodo: body.gestionperiodo,

        arraydocente: body.arraydocente.map( ( { error, message, ...item } ) => {
            return item;
        } ),

        sigla: body.sigla,
        descripcion: body.descripcion,

        cupo: parseInt(body.cupo),
        fechainicio: body.fechainicio,
        fechafinal: body.fechafinal,

        prerequisito: body.prerequisito,
        objetivo: body.objetivo,
        cantidadhora: parseFloat(body.cantidadhora),
        inversionbase: parseFloat(body.inversionbase),

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

const onShow = async (idcurso) => {
    return await httpRequest('get', apiServices.apiofertaacademicacurso_show + `/${idcurso}`, {
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

const onEdit = async (idcurso) => {
    return await httpRequest('get', apiServices.apiofertaacademicacurso_edit + `/${idcurso}`, {
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
    return await httpRequest('put', apiServices.apiofertaacademicacurso_update + `/${body.idcurso}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,

        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,

        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,

        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,

        fkidturno: body.fkidturno,
        turno: body.turno,

        fkidmateria: body.fkidmateria,
        materia: body.materia,

        fkidgestionperiodo: body.fkidgestionperiodo,
        gestionperiodo: body.gestionperiodo,

        arraydocente: body.arraydocente.map( ( { error, message, ...item } ) => {
            return item;
        } ),

        sigla: body.sigla,
        descripcion: body.descripcion,

        cupo: parseInt(body.cupo),
        fechainicio: body.fechainicio,
        fechafinal: body.fechafinal,

        prerequisito: body.prerequisito,
        objetivo: body.objetivo,
        cantidadhora: parseFloat(body.cantidadhora),
        inversionbase: parseFloat(body.inversionbase),
        
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
    return await httpRequest('delete', apiServices.apiofertaacademicacurso_delete + `/${body.idcurso}`, {
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

const onAperturaCierre = async (body) => {
    return await httpRequest('post', apiServices.apiofertaacademicacurso_aperturarcerrarcurso + `/${body.idcurso}`, {
        fkidmotivoaperturacierrecurso: body.fkidmotivoaperturacierrecurso,
        motivoaperturacierrecurso: body.motivoaperturacierrecurso,

        fkidadministrativo: body.fkidadministrativo,
        administrativo: body.administrativo,

        observaciones: body.observaciones,
        fechaoperacion: body.fechaoperacion,
        estadoproceso: body.estadoproceso,
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

const onCierre = async (body) => {
    return await httpRequest('post', apiServices.apiofertaacademicacurso_cierrecurso + `/${body.idcurso}`, {
        observaciones: body.observaciones,
        fechaoperacion: body.fechaoperacion,
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

export const CursoService = {
    getAllCurso,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
    onAperturaCierre,
    onCierre,
};
