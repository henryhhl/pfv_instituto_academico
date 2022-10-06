
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllOfertaAcademica = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminofertaacademica_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idofertaacademica) => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_show + `/${idofertaacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idofertaacademica) => {
    return await httpRequest('get', apiServices.apiadminofertaacademica_edit + `/${idofertaacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminofertaacademica_update + `/${body.idofertaacademica}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminofertaacademica_delete + `/${body.idofertaacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const OfertaAcademicaService = {
    getAllOfertaAcademica,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
