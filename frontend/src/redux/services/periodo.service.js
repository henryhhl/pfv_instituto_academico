
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllPeriodo = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminperiodo_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminperiodo_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idperiodo) => {
    return await httpRequest('get', apiServices.apiadminperiodo_show + `/${idperiodo}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idperiodo) => {
    return await httpRequest('get', apiServices.apiadminperiodo_edit + `/${idperiodo}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminperiodo_update + `/${body.idperiodo}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminperiodo_delete + `/${body.idperiodo}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const PeriodoService = {
    getAllPeriodo,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
