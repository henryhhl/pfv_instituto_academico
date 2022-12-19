
const InscripcionPrograma = {
    idinscripcionprograma: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidprograma: "",
    programa: "",

    fkidpensum: "",
    pensum: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

    fkidestudiante: "",
    estudiante: "",
    numeroregistro: "",

    fechainscripcion: "",
    esinscripcionformalizada: "",
    nota: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidunidadadministrativa: false,
        fkidunidadacademica: false,
        fkidunidadnegocio: false,
        fkidprograma: false,
        fkidpensum: false,
        fkidgestionperiodo: false,
        fkidmodalidadacademica: false,
        fkidestudiante: false,
        
        fechainscripcion: false,
        numeroregistro: false,
        esinscripcionformalizada: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadadministrativa: "",
        fkidunidadacademica: "",
        fkidunidadnegocio: "",
        fkidprograma: "",
        fkidpensum: "",
        fkidgestionperiodo: "",
        fkidmodalidadacademica: "",
        fkidestudiante: "",

        fechainscripcion: "",
        numeroregistro: "",
        esinscripcionformalizada: "",
        
        estado: "",
        isdelete: "",
    },
};

export default InscripcionPrograma;
