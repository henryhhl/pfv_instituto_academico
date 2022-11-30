
const TipoContacto = {
    idtipocontacto: "",
    sigla: "",
    descripcion: "",
    tiporeferenciacontacto: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        sigla: false,
        descripcion: false,
        tiporeferenciacontacto: false,
        estado: false,
        isdelete: false,
    },

    message: {
        sigla: "",
        descripcion: "",
        tiporeferenciacontacto: "",
        estado: "",
        isdelete: "",
    },
};

export default TipoContacto;
