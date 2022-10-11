
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllRol = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadrol_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiseguridadrol_store, {
        fkidtiporol: body.fkidtiporol,
        tiporol: body.tiporol,
        descripcion: body.descripcion,
        nota: body.nota,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idrol) => {
    return await httpRequest('get', apiServices.apiseguridadrol_show + `/${idrol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idrol) => {
    return await httpRequest('get', apiServices.apiseguridadrol_edit + `/${idrol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiseguridadrol_update + `/${body.idrol}`, {
        fkidtiporol: body.fkidtiporol,
        tiporol: body.tiporol,
        descripcion: body.descripcion,
        nota: body.nota,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiseguridadrol_delete + `/${body.idrol}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const RolService = {
    getAllRol,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
