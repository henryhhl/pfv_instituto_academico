
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllModalidadAcademica = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminmodalidadacademica_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminmodalidadacademica_store, {
        sigla: body.sigla,
        descripcion: body.descripcion,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idmodalidadacademica) => {
    return await httpRequest('get', apiServices.apiadminmodalidadacademica_show + `/${idmodalidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idmodalidadacademica) => {
    return await httpRequest('get', apiServices.apiadminmodalidadacademica_edit + `/${idmodalidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminmodalidadacademica_update + `/${body.idmodalidadacademica}`, {
        sigla: body.sigla,
        descripcion: body.descripcion,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminmodalidadacademica_delete + `/${body.idmodalidadacademica}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const ModalidadAcademicaService = {
    getAllModalidadAcademica,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
