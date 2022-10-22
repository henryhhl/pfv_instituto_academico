
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllResponsable = async (search = "") => {
    return await httpRequest('get', apiServices.apiestructuraacademicaresponsable_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiestructuraacademicaresponsable_store, {
        codigo: body.codigo,
        nrodocumento: body.nrodocumento,
        nombre: body.nombre,
        apellido: body.apellido,
        ciudad: body.ciudad,
        direccion: body.direccion,
        genero: body.genero,
        fechanacimiento: body.fechanacimiento,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idresponsable) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaresponsable_show + `/${idresponsable}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idresponsable) => {
    return await httpRequest('get', apiServices.apiestructuraacademicaresponsable_edit + `/${idresponsable}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicaresponsable_update + `/${body.idresponsable}`, {
        codigo: body.codigo,
        nrodocumento: body.nrodocumento,
        nombre: body.nombre,
        apellido: body.apellido,
        ciudad: body.ciudad,
        direccion: body.direccion,
        genero: body.genero,
        fechanacimiento: body.fechanacimiento,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiestructuraacademicaresponsable_delete + `/${body.idresponsable}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const ResponsableService = {
    getAllResponsable,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
