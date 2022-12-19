
const InscripcionCurso = {
    idinscripcioncurso: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidcurso: "",
    curso: "",

    fkidturno: "",
    turno: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

    fkidestudiante: "",
    estudiante: "",
    numeroregistro: "",

    fechainscripcion: "",
    esinscripcionformalizada: "",
    condicion: "",
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
        fkidcurso: false,
        fkidturno: false,
        fkidgestionperiodo: false,
        fkidmodalidadacademica: false,
        fkidestudiante: false,
        
        fechainscripcion: false,
        numeroregistro: false,
        esinscripcionformalizada: false,
        condicion: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadadministrativa: "",
        fkidunidadacademica: "",
        fkidunidadnegocio: "",
        fkidcurso: "",
        fkidturno: "",
        fkidgestionperiodo: "",
        fkidmodalidadacademica: "",
        fkidestudiante: "",

        fechainscripcion: "",
        numeroregistro: "",
        esinscripcionformalizada: "",
        condicion: "",
        
        estado: "",
        isdelete: "",
    },
};

export default InscripcionCurso;
