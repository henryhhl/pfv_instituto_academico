
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllPermiso = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadpermiso_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiseguridadpermiso_store, {
        fkidtipopermiso: body.fkidtipopermiso,
        tipopermiso: body.tipopermiso,
        fkidpermisopadre: body.fkidpermisopadre,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idpermiso) => {
    return await httpRequest('get', apiServices.apiseguridadpermiso_show + `/${idpermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idpermiso) => {
    return await httpRequest('get', apiServices.apiseguridadpermiso_edit + `/${idpermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiseguridadpermiso_update + `/${body.idpermiso}`, {
        fkidtipopermiso: body.fkidtipopermiso,
        tipopermiso: body.tipopermiso,
        fkidpermisopadre: body.fkidpermisopadre,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiseguridadpermiso_delete + `/${body.idpermiso}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const PermisoService = {
    getAllPermiso,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
