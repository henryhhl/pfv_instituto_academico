
import apiServices from "../../../utils/apiservices";
import { httpRequest } from "../../../utils/httpRequest";

const getAllPensum = async (search = "") => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_index, {
        search: search,
    } ).then( (respta) => {
        return respta;
    } );
};

const onStore = async (body) => {
    return await httpRequest('post', apiServices.apiestructuraacademicapensum_store, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidprograma: body.fkidprograma,
        programa: body.programa,
        descripcion: body.descripcion,
        fechaaprobacion: body.fechaaprobacion,
        estadoproceso: body.estadoproceso,
    } ).then( (respta) => {
        return respta;
    } );
};

const onShow = async (idpensum) => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_show + `/${idpensum}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onEdit = async (idpensum) => {
    return await httpRequest('get', apiServices.apiestructuraacademicapensum_edit + `/${idpensum}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

const onUpdate = async (body) => {
    return await httpRequest('put', apiServices.apiestructuraacademicapensum_update + `/${body.idpensum}`, {
        fkidunidadnegocio: body.fkidunidadnegocio,
        unidadnegocio: body.unidadnegocio,
        fkidunidadadministrativa: body.fkidunidadadministrativa,
        unidadadministrativa: body.unidadadministrativa,
        fkidunidadacademica: body.fkidunidadacademica,
        unidadacademica: body.unidadacademica,
        fkidprograma: body.fkidprograma,
        programa: body.programa,
        descripcion: body.descripcion,
        fechaaprobacion: body.fechaaprobacion,
        estadoproceso: body.estadoproceso,
        estado: body.estado,
    } ).then( (respta) => {
        return respta;
    } );
};

const onDelete = async (body) => {
    return await httpRequest('delete', apiServices.apiestructuraacademicapensum_delete + `/${body.idpensum}`, {
    } ).then( (respta) => {
        return respta;
    } );
};

export const PensumService = {
    getAllPensum,
    onStore,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
