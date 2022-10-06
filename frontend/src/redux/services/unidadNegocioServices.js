
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllUnidadNegocio = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminunidadnegocio_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminunidadnegocio_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idunidadnegocio) => {
    return await httpRequest('get', apiServices.apiadminunidadnegocio_show + `/${idunidadnegocio}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idunidadnegocio) => {
    return await httpRequest('get', apiServices.apiadminunidadnegocio_edit + `/${idunidadnegocio}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminunidadnegocio_update + `/${body.idunidadnegocio}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminunidadnegocio_delete + `/${body.idunidadnegocio}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const UnidadNegocioService = {
    getAllUnidadNegocio,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
