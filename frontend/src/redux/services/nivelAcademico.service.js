
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllNivelAcademico = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminnivelacademico_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminnivelacademico_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idnivelacademico) => {
    return await httpRequest('get', apiServices.apiadminnivelacademico_show + `/${idnivelacademico}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idnivelacademico) => {
    return await httpRequest('get', apiServices.apiadminnivelacademico_edit + `/${idnivelacademico}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminnivelacademico_update + `/${body.idnivelacademico}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminnivelacademico_delete + `/${body.idnivelacademico}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const NivelAcademicoService = {
    getAllNivelAcademico,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
