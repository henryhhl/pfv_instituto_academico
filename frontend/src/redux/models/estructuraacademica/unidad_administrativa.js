
const UnidadAdministrativa = {
    idunidadadministrativa: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    arrayturno: [],
    arrayaula: [],

    sigla: "",
    descripcion: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidunidadnegocio: false,
        sigla: false,
        descripcion: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadnegocio: "",
        sigla: "",
        descripcion: "",
        estado: "",
        isdelete: "",
    },
};

export default UnidadAdministrativa;
