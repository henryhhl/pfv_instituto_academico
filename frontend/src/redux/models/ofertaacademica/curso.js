
const Curso = {
    idcurso: "",

    arraydocente: [],
    arrayparametrocalificacion: [],
    arrayparametrocalificaciondelete: [],

    horainicio: "",
    horafinal: "",

    fkidaula: "",
    aula: "",

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

    fkidturno: "",
    turno: "",

    fkidmateria: "",
    materia: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",

    sigla: "",
    descripcion: "",
    cupo: "",
    fechainicio: "",
    fechafinal: "",
    version: "",
    prerequisito: "",
    objetivo: "",
    cantidadhora: "",
    inversionbase: "",

    fkidmotivoaperturacierrecurso: "",
    motivoaperturacierrecurso: "",

    fkidadministrativo: "",
    administrativo: "",

    observaciones: "",
    fechaoperacion: "",
    estadoproceso: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        idcurso: false,
        fkidunidadnegocio: false,
        fkidunidadadministrativa: false,
        fkidunidadacademica: false,
        fkidmodalidadacademica: false,
        fkidturno: false,
        fkidmateria: false,
        fkidgestionperiodo: false,

        fkidmotivoaperturacierrecurso: false,
        fkidadministrativo: false,
        fechaoperacion: false,
        estadoproceso: false,

        sigla: false,
        descripcion: false,
        cupo: false,
        fechainicio: false,
        fechafinal: false,
        cantidadhora: false,
        inversionbase: false,

        estado: false,
        isdelete: false,
    },

    message: {
        idcurso: "",
        fkidunidadnegocio: "",
        fkidunidadadministrativa: "",
        fkidunidadacademica: "",
        fkidmodalidadacademica: "",
        fkidturno: "",
        fkidmateria: "",
        fkidgestionperiodo: "",

        fkidmotivoaperturacierrecurso: "",
        fkidadministrativo: "",
        fechaoperacion: "",
        estadoproceso: "",

        sigla: "",
        descripcion: "",
        cupo: "",
        fechainicio: "",
        fechafinal: "",
        cantidadhora: "",
        inversionbase: "",

        estado: "",
        isdelete: "",
    },
};

export default Curso;
