
const Programa = {
    idprograma: "",

    arraymallacurricular: [],
    
    fkiddivisionacademica: "",
    divisionacademica: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidnivelacademico: "",
    nivelacademico: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

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
        fkidunidadacademica: false,
        fkidnivelacademico: false,
        fkidmodalidadacademica: false,

        codigo: false,
        sigla: false,
        descripcion: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadnegocio: "",
        fkidunidadadministrativa: "",
        fkidunidadacademica: "",
        fkidnivelacademico: "",
        fkidmodalidadacademica: "",

        codigo: "",
        sigla: "",
        descripcion: "",

        estado: "",
        isdelete: "",
    },
};

export default Programa;
