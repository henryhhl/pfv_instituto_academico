
const NotaCurso = {

    idnotacurso: "",

    fkiddocente: "",
    docente: "",

    arrayMateria: [],
    arrayEstudianteInscrito: [],
    arrayAsistenciaEstudianteSelected: [],

    fkidcurso: "",
    siglacurso: "",
    curso: "",

    fechainicio: "",
    fechafinal: "",
    feachaasistenciaseleted: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

    fkidmateria: "",
    materia: "",

    fkidturno: "",
    turno: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    error: {
        fkiddocente: false,
        
        estado: false,
        isdelete: false,
    },

    message: {
        fkiddocente: "",
        
        estado: "",
        isdelete: "",
    },

};

export default NotaCurso;
