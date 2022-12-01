
const Negocio = {
    idnegocio: "",

    fkidprograma: "",
    programa: "",

    fkidturno: "",
    turno: "",

    fkidestadonegocio: "",
    estadonegocio: "",

    identificacion: "",
    descripcion: "",
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

        identificacion: false,
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

        identificacion: "",
        descripcion: "",
        fechainicio: "",
        fechacierre: "",

        estado: "",
        isdelete: "",
    },
};

export default Negocio;
