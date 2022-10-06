
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllTipoMateria = async (search = "") => {
    return await httpRequest('get', apiServices.apiadmintipomateria_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadmintipomateria_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idtipomateria) => {
    return await httpRequest('get', apiServices.apiadmintipomateria_show + `/${idtipomateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idtipomateria) => {
    return await httpRequest('get', apiServices.apiadmintipomateria_edit + `/${idtipomateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadmintipomateria_update + `/${body.idtipomateria}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadmintipomateria_delete + `/${body.idtipomateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const TipoMateriaService = {
    getAllTipoMateria,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
