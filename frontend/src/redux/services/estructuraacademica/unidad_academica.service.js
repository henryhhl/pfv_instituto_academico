
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllUnidadAcademica = async (search = "") => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadacademica_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiestructuraacademicaunidadacademica_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idunidadacademica) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadacademica_show + `/${idunidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idunidadacademica) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadacademica_edit + `/${idunidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicaunidadacademica_update + `/${body.idunidadacademica}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        codigo: body.codigo,
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiestructuraacademicaunidadacademica_delete + `/${body.idunidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const UnidadAcademicaService = {
    getAllUnidadAcademica,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
