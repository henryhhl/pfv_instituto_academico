
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllReferenciaContacto = async (search = "") => {
    return await httpRequest('get', apiServices.apiparametrosadminreferenciacontacto_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiparametrosadminreferenciacontacto_store, {
        descripcion: body.descripcion,
        // tiporeferenciacontacto: body.tiporeferenciacontacto,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idreferenciacontacto) => {
    return await httpRequest('get', apiServices.apiparametrosadminreferenciacontacto_show + `/${idreferenciacontacto}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idreferenciacontacto) => {
    return await httpRequest('get', apiServices.apiparametrosadminreferenciacontacto_edit + `/${idreferenciacontacto}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiparametrosadminreferenciacontacto_update + `/${body.idreferenciacontacto}`, {
        descripcion: body.descripcion,
        // tiporeferenciacontacto: body.tiporeferenciacontacto,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiparametrosadminreferenciacontacto_delete + `/${body.idreferenciacontacto}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const ReferenciaContactoService = {
    getAllReferenciaContacto,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
