
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllTipoCiudad = async (search = "") => {
    return await httpRequest('get', apiServices.apiparametrosadmintipociudad_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiparametrosadmintipociudad_store, {
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idtipociudad) => {
    return await httpRequest('get', apiServices.apiparametrosadmintipociudad_show + `/${idtipociudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idtipociudad) => {
    return await httpRequest('get', apiServices.apiparametrosadmintipociudad_edit + `/${idtipociudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiparametrosadmintipociudad_update + `/${body.idtipociudad}`, {
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiparametrosadmintipociudad_delete + `/${body.idtipociudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const TipoCiudadService = {
    getAllTipoCiudad,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
