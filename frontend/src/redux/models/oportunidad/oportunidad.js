
const Oportunidad = {
    idoportunidad: "",

    arraynegocio: [],
    arraytipocontacto: [],
    arraytipomediopublicitario: [],

    fkidciudadorigen: "",
    ciudadorigen: "",

    fkidasesorresponsable: "",
    asesorresponsable: "",

    descripcion: "",
    identificacion: "",
    celular: "",
    email: "",
    direccion: "",
    barrio: "",
    fecharegistro: "",
    horaregistro: "",
    nota: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidciudadorigen: false,
        fkidasesorresponsable: false,

        descripcion: false,
        identificacion: false,
        celular: false,
        email: false,
        direccion: false,
        barrio: false,
        fecharegistro: false,
        horaregistro: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidciudadorigen: "",
        fkidasesorresponsable: "",

        descripcion: "",
        identificacion: "",
        celular: "",
        email: "",
        direccion: "",
        barrio: "",
        fecharegistro: "",
        horaregistro: "",

        estado: "",
        isdelete: "",
    },
};

export default Oportunidad;
