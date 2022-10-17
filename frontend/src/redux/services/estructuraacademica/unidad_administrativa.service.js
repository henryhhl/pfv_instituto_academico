
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllUnidadAdministrativa = async (search = "") => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadadministrativa_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiestructuraacademicaunidadadministrativa_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idunidadadministrativa) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadadministrativa_show + `/${idunidadadministrativa}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idunidadadministrativa) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaunidadadministrativa_edit + `/${idunidadadministrativa}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicaunidadadministrativa_update + `/${body.idunidadadministrativa}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiestructuraacademicaunidadadministrativa_delete + `/${body.idunidadadministrativa}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const UnidadAdministrativaService = {
    getAllUnidadAdministrativa,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
