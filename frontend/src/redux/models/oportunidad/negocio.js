
const Negocio = {
    idnegocio: "",

    fkidprograma: "",
    programa: "",

    fkidturno: "",
    turno: "",

    fkidestadonegocio: "",
    estadonegocio: "",

    fkidoportunidad: "",
    oportunidad: "",

    fechainicio: "",
    fechacierre: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidprograma: false,
        fkidturno: false,
        fkidestadonegocio: false,
        fkidoportunidad: false,

        fechainicio: false,
        fechacierre: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidprograma: "",
        fkidturno: "",
        fkidestadonegocio: "",
        fkidoportunidad: "",

        fechainicio: "",
        fechacierre: "",

        estado: "",
        isdelete: "",
    },
};

export default Negocio;
