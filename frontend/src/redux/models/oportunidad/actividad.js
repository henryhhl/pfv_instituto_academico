
const Actividad = {
    idactividad: "",

    fkidtipoactividad: "",
    tipoactividad: "",

    fkidtiporesultado: "",
    tiporesultado: "",

    fkidasesorresponsable: "",
    asesorresponsable: "",

    fkidnegocio: "",
    negocio: "",

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
        fkidnegocio: false,
        fkidtiporesultado: false,

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
        fkidnegocio: "",
        fkidtiporesultado: "",

        descripcion: "",
        nroactividad: "",
        fechaprogramada: "",
        horaprogramada: "",

        estado: "",
        isdelete: "",
    },
};

export default Actividad;
