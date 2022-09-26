
const Materia = {
    idmateria: "",
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
