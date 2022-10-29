
const Institucion = {
    idinstitucion: "",

    fkidciudad: "",
    ciudad: "",

    sigla: "",
    descripcion: "",
    nit: "",
    telefono: "",
    celular: "",
    direccion: "",
    email: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidciudad: false,
        sigla: false,
        descripcion: false,
        nit: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidciudad: "",
        sigla: "",
        descripcion: "",
        nit: "",
        estado: "",
        isdelete: "",
    },
};

export default Institucion;
