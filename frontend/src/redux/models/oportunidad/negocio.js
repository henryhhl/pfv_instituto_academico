
const Negocio = {
    idnegocio: "",

    arrayactividad: [],

    fkidprograma: "",
    programa: "",

    fkidturno: "",
    turno: "",

    fkidestadonegocio: "",
    estadonegocio: "",

    fkidoportunidad: "",
    oportunidad: "",

    identificacion: "",
    descripcion: "",
    fechainicio: "",
    fechacierre: "",
    nota: "",

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

        descripcion: false,
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

        descripcion: "",
        fechainicio: "",
        fechacierre: "",

        estado: "",
        isdelete: "",
    },
};

export default Negocio;
