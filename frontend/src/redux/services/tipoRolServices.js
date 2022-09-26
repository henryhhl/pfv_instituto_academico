
import apiServices from "../../utils/apiservices";
import { httpRequest } from "../../utils/httpRequest";

const getAllTipoRol = async (search = "") => {
    return await httpRequest('get', apiServices.apiseguridadtiporol_index, {
        search: search,
    } ).then( (respta) => {
        console.log(respta);
    } );
};

export const TipoRolService = {
    getAllTipoRol,
};
