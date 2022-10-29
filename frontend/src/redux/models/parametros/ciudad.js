
const Ciudad = {
    idciudad: "",
    fkidtipociudad: "",
    tipociudad: "",
    fkidciudadpadre: "",
    sigla:"",
    descripcion: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidtipociudad: false,
        sigla: false,
        descripcion: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidtipociudad: "",
        sigla: "",
        descripcion: "",
        estado: "",
        isdelete: "",
    },
};

export default Ciudad;
