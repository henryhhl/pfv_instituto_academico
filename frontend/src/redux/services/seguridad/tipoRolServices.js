
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllTipoRol = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiseguridadtiporol_store, {
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idtiporol) => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_show + `/${idtiporol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idtiporol) => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_edit + `/${idtiporol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiseguridadtiporol_update + `/${body.idtiporol}`, {
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiseguridadtiporol_delete + `/${body.idtiporol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const TipoRolService = {
    getAllTipoRol,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
