
const Materia = {
    idmateria: "",
    fkidtipomateria: "",
    tipomateria: "",
    codigo:"",
    sigla:"",
    nombrelargo: "",
    nombrecorto: "",
    nombrealternativo: "",
    creditos: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidtipomateria: false,
        codigo: false,
        sigla: false,
        nombrelargo: false,
        nombrecorto: false,
        nombrealternativo: false,
        creditos: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidtipomateria: "",
        codigo: "",
        sigla: "",
        nombrelargo: "",
        nombrecorto: "",
        nombrealternativo: "",
        creditos: "",
        estado: "",
        isdelete: "",
    },
};

export default Materia;
