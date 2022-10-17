
const UnidadAcademica = {
    idunidadacademica: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    codigo: "",
    sigla: "",
    descripcion: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidunidadadministrativa: false,
        fkidunidadnegocio: false,
        codigo: false,
        sigla: false,
        descripcion: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadnegocio: "",
        fkidunidadadministrativa: "",
        codigo: "",
        sigla: "",
        descripcion: "",
        estado: "",
        isdelete: "",
    },
};

export default UnidadAcademica;
