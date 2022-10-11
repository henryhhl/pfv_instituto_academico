
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllTipoPermiso = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadtipopermiso_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiseguridadtipopermiso_store, {
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idtipopermiso) => {
    return await httpRequest('get', apiServices.apiseguridadtipopermiso_show + `/${idtipopermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idtipopermiso) => {
    return await httpRequest('get', apiServices.apiseguridadtipopermiso_edit + `/${idtipopermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiseguridadtipopermiso_update + `/${body.idtipopermiso}`, {
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiseguridadtipopermiso_delete + `/${body.idtipopermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const TipoPermisoService = {
    getAllTipoPermiso,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
