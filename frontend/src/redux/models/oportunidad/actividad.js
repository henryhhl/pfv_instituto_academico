
const Actividad = {
    idactividad: "",

    fkidtipoactividad: "",
    tipoactividad: "",

    fkidasesorresponsable: "",
    asesorresponsable: "",

    fkidestadonegocio: "",
    estadonegocio: "",

    fkidnegocio: "",
    negocio: "",

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
        fkidnegocio: false,

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
        fkidnegocio: "",

        nroactividad: "",
        fechaprogramada: "",
        horaprogramada: "",

        estado: "",
        isdelete: "",
    },
};

export default Actividad;
