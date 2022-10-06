
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllMateria = async (search = "") => {
    return await httpRequest('get', apiServices.apiadminmateria_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiadminmateria_store, {
        fkidtipomateria: body.fkidtipomateria,
        tipomateria: body.tipomateria,
        codigo: body.codigo,
        sigla: body.sigla,
        nombrelargo: body.nombrelargo,
        nombrecorto: body.nombrecorto,
        nombrealternativo: body.nombrealternativo,
        creditos: body.creditos,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idmateria) => {
    return await httpRequest('get', apiServices.apiadminmateria_show + `/${idmateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idmateria) => {
    return await httpRequest('get', apiServices.apiadminmateria_edit + `/${idmateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiadminmateria_update + `/${body.idmateria}`, {
        fkidtipomateria: body.fkidtipomateria,
        tipomateria: body.tipomateria,
        codigo: body.codigo,
        sigla: body.sigla,
        nombrelargo: body.nombrelargo,
        nombrecorto: body.nombrecorto,
        nombrealternativo: body.nombrealternativo,
        creditos: body.creditos,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiadminmateria_delete + `/${body.idmateria}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const MateriaService = {
    getAllMateria,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
