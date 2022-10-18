
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllPrograma = async (search = "") => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiestructuraacademicaprograma_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidnivelacademico: body.fkidnivelacademico,
        nivelacademico: body.nivelacademico,
        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idprograma) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_show + `/${idprograma}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idprograma) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaprograma_edit + `/${idprograma}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicaprograma_update + `/${body.idprograma}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidnivelacademico: body.fkidnivelacademico,
        nivelacademico: body.nivelacademico,
        fkidmodalidadacademica: body.fkidmodalidadacademica,
        modalidadacademica: body.modalidadacademica,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiestructuraacademicaprograma_delete + `/${body.idprograma}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const ProgramaService = {
    getAllPrograma,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
