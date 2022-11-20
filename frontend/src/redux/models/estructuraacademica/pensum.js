
const Pensum = {
    idpensum: "",

    arraydivisionacademica: [],

    fkidunidadnegocio: "",
    unidadnegocio: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidunidadacademica: "",
    unidadacademica: "",

    fkidprograma: "",
    programa: "",

    descripcion: "",
    fechaaprobacion: "",
    estadoproceso: "",
    nota: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidunidadadministrativa: false,
        fkidunidadnegocio: false,
        fkidunidadacademica: false,
        fkidprograma: false,

        descripcion: false,
        fechaaprobacion: false,
        estadoproceso: false,

        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadnegocio: "",
        fkidunidadadministrativa: "",
        fkidunidadacademica: "",
        fkidprograma: "",

        descripcion: "",
        fechaaprobacion: "",
        estadoproceso: "",

        estado: "",
        isdelete: "",
    },
};

export default Pensum;
