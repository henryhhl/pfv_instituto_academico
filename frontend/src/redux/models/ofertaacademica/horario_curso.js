
const CursoHorario = {
    idcursohorario: "",

    arraydias: [],
    arrayhorario: [],
    arraydocente: [],

    fkidcurso: "",
    curso: "",

    fkidmateria: "",
    materia: "",

    fkidturno: "",
    turno: "",

    fkidmodalidadacademica: "",
    modalidadacademica: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",

    fechainicio: "",
    fechafinal: "",

    error: {
        fkidcurso: false,
        fkidmateria: false,
        fkidturno: false,
        fkidmodalidadacademica: false,
    },

    message: {
        fkidcurso: "",
        fkidmateria: "",
        fkidturno: "",
        fkidmodalidadacademica: "",
    },
};

export default CursoHorario;
