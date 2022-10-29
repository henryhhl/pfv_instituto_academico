
const GestionPeriodo = {
    idgestionperiodo: "",

    descripcion: "",
    orden: "",
    fechainicio: "",
    fechafinal: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        descripcion: false,
        orden: false,
        fechainicio: false,
        fechafinal: false,
        estado: false,
        isdelete: false,
    },

    message: {
        descripcion: "",
        orden: "",
        fechainicio: "",
        fechafinal: "",
        estado: "",
        isdelete: "",
    },
};

export default GestionPeriodo;
