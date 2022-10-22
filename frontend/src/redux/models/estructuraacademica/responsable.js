
const Responsable = {
    idresponsable: "",

    codigo: "",
    nrodocumento: "",
    nombre: "",
    apellido: "",
    ciudad: "",
    direccion: "",
    genero: "",
    fechanacimiento: "",

    arrayResponsableUnidadAcademicaDetalle: [],
    arrayResponsableReferenciaContactoDetalle: [],

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        codigo: false,
        nrodocumento: false,
        nombre: false,
        apellido: false,
        ciudad: false,
        direccion: false,
        genero: false,
        fechanacimiento: false,
        estado: false,
        isdelete: false,
    },

    message: {
        codigo: "",
        nrodocumento: "",
        nombre: "",
        apellido: "",
        ciudad: "",
        direccion: "",
        genero: "",
        fechanacimiento: "",
        estado: "",
        isdelete: "",
    },
};

export default Responsable;
