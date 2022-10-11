
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllCiudad = async (search = "") => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiparametrosadminciudad_store, {
        fkidciudadpadre: body.fkidciudadpadre,
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idciudad) => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_show + `/${idciudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idciudad) => {
    return await httpRequest('get', apiServices.apiparametrosadminciudad_edit + `/${idciudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiparametrosadminciudad_update + `/${body.idciudad}`, {
        fkidciudadpadre: body.fkidciudadpadre,
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiparametrosadminciudad_delete + `/${body.idciudad}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const CiudadService = {
    getAllCiudad,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
