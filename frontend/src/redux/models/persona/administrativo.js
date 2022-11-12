
const Administrativo = {
    idadministrativo: "",

    fkidtipoidentificacion: "",
    tipoidentificacion: "",

    fkidciudadnacimiento: "",
    ciudadnacimiento: "",

    fkidciudadresidencia: "",
    ciudadresidencia: "",

    arrayreferenciacontactos: [],
    arraynacionalidad: [],
    arraycategoriadocumento: [],
    arrayestudio: [],

    nombreprincipal: "",
    nombreadicional: "",

    apellidoprimero: "",
    apellidosegundo: "",

    numeroidentificacion: "",
    genero: "",
    email: "",
    telefono: "",
    celular: "",
    fechanacimiento: "",
    direccion: "",
    uv: "",
    manzano: "",
    barrio: "",
    estadocivil: "",
    imagen: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidtipoidentificacion: false,
        fkidciudadnacimiento: false,
        fkidciudadresidencia: false,

        nombreprincipal: false,
        apellidoprimero: false,

        fechanacimiento: false,
        numeroidentificacion: false,
        estadocivil: false,
        genero: false,
        email: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidtipoidentificacion: "",
        fkidciudadnacimiento: "",
        fkidciudadresidencia: "",

        nombreprincipal: "",
        apellidoprimero: "",

        fechanacimiento: "",
        numeroidentificacion: "",
        genero: "",
        estadocivil: "",
        email: "",

        estado: "",
        isdelete: "",
    },
};

export default Administrativo;
