
const Actividad = {
    idactividad: "",

    fkidtipoactividad: "",
    tipoactividad: "",

    fkidasesorresponsable: "",
    asesorresponsable: "",

    fkidestadonegocio: "",
    estadonegocio: "",

    identificacion: "",
    descripcion: "",
    nroactividad: "",
    fechaprogramada: "",
    horaprogramada: "",

    nota: "",
    fechacierre: "",
    resultado: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidtipoactividad: false,
        fkidasesorresponsable: false,
        fkidestadonegocio: false,

        identificacion: false,
        descripcion: false,
        nroactividad: false,
        fechaprogramada: false,
        horaprogramada: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidtipoactividad: "",
        fkidasesorresponsable: "",
        fkidestadonegocio: "",

        identificacion: "",
        descripcion: "",
        nroactividad: "",
        fechaprogramada: "",
        horaprogramada: "",

        estado: "",
        isdelete: "",
    },
};

export default Actividad;
