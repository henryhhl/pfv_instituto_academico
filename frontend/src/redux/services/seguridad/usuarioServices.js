
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllUsuario = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadusuario_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiseguridadusuario_store, {
        email: body.email,
        login: body.login,
        password: body.password,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idusuario) => {
    return await httpRequest('get', apiServices.apiseguridadusuario_show + `/${idusuario}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idusuario) => {
    return await httpRequest('get', apiServices.apiseguridadusuario_edit + `/${idusuario}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiseguridadusuario_update + `/${body.idusuario}`, {
        email: body.email,
        login: body.login,
        password: body.password,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiseguridadusuario_delete + `/${body.idusuario}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const UsuarioService = {
    getAllUsuario,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
